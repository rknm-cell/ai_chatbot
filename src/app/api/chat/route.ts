import { openai } from "@ai-sdk/openai";
import {
  appendClientMessage,
  appendResponseMessages,
  
  createDataStream,
  generateId,
  streamText,
} from "ai";
import { getMessagesByChatId } from "~/lib/db/queries";
import { loadChat, saveChat } from "~/tools/chat-store";
import { createResumableStreamContext } from 'resumable-stream';
import { appendStreamId, loadStreams } from "@/util/chat-store";



export const maxDuration = 30;

const streamContext = createResumableStreamContext({
  waitUntil: after,
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return new Response("id is required", { status: 400 });
  }
  const streamIds = await loadStreams(chatId);

  if (!streamIds.length) {
    return new Response("No streams found", { status: 404 });
  }
  const recentStreamId = streamIds.at(-1);

  if (!recentStreamId) {
    return new Response("No recent stream found", { status: 404 });
  }
  
  const emptyDataStream = createDataStream({
    execute: () => {},
  });

  const stream = await streamContext.resumableStream(
    recentStreamId,
    () => emptyDataStream,
  );
  if (stream) {
    return new Response(stream, { status: 200 });
  }

  const messages = await getMessagesByChatId({ id: chatId });
  const mostRecentMessage = messages?.at(-1);

  if (!mostRecentMessage || mostRecentMessage.role !== "assistant") {
    return new Response(emptyDataStream, { status: 200 });
  }
}

export async function POST(req: Request) {
  // gets the last message from the client:
  const { messages, id } = await req.json();
  const streamId = generateId();

  await appendStreamId({ chatId: id, streamId });
  

  const stream = createDataStream({
    execute: (dataStream) => {
      const result = streamText({
        model: openai("gpt-4o"),
        messages,
        onFinish: async ({ response }) => {
          await saveChat({
            id,
            messages: appendResponseMessages({
              messages,
              responseMessages: response.messages,
            }),
          });
        },
      });
      result.mergeIntoDataStream(dataStream);
    },
  });
  return new Response(
    await streamContext.resumableStream(streamId, () => stream),
  )
}
function after(promise: Promise<unknown>): void {
  throw new Error("Function not implemented.");
}

