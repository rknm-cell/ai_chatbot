/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { openai } from '@ai-sdk/openai';
import { appendResponseMessages, streamText } from 'ai';
import { saveChat } from '~/tools/chat-store';

export async function POST(req: Request) {
  const { messages, id } = await req.json();
  

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    async onFinish({ response }) {
      await saveChat({
        id,
        messages: appendResponseMessages({
          messages,
          responseMessages: response.messages,
        }),

      });
    },
  });

  return result.toDataStreamResponse();
}
