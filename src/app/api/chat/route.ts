// import { openai } from "@ai-sdk/openai";
import {
  appendClientMessage,
  appendResponseMessages,
  streamText,
  type Message,
} from "ai";

import { openai } from "@ai-sdk/openai";
import {
  getChatById,
  getMessagesByChatId,
  saveChat,
  saveMessages,
} from "~/lib/db/queries";
import { postRequestBodySchema, type PostRequestBody } from "./schema";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const json = await req.json();
  console.log("json data: ", json)
  // console.log("Chat: ");
  const { id, messages } = json;
  console.log("id:", id);
  console.log("messages array:", messages);
  console.log("messages length:", messages?.length);
  console.log("first message:", messages?.[0]);

  const chat = await getChatById({ id });
  const title = chat?.title ?? "New chat";

  const previousMessages = await getMessagesByChatId({ id });

  

  await saveChat({
    id,
    title,
  });
  try {
    const result = streamText({
      model: openai("gpt-4-turbo"),
      system: "You are a helpful assistant.",
      messages,
      async onFinish({ response }) {
        // console.log("response", response)

        const [, assistantMessage] = appendResponseMessages({
          messages: [messages],
          responseMessages: response.messages,
        });

        if (assistantMessage) {
          await saveMessages({
            messages: [
              {
                id: id,
                chatId: id,
                role: assistantMessage.role,
                content: assistantMessage.content,
                createdAt: new Date(),
              },
            ],
          });
        }
      },
    });
    // console.log(result.toDataStreamResponse())
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat route error: ", error);
    return new Response("500 error");
  }
}

