// import { openai } from "@ai-sdk/openai";
// import {
//   appendResponseMessages,
//   createIdGenerator,
//   streamText,
//   appendClientMessage,
// } from "ai";
// import { loadChat } from "~/tools/chat-store";
// import { getChatById, saveChat} from "~/lib/db/queries";
// /* eslint-disable */
// export async function POST(req: Request) {
//   // get the last message from the client:
//   const { message, id, userId, title } = await req.json();

//   // load the previous messages from the server:
//   const previousMessages = await getChatById(id);

//   // append the new message to the previous messages:
//   const messages = appendClientMessage({
//     messages: previousMessages,
//     message,
//   });


//   const result = streamText({
//     model: openai("gpt-4o-mini"),
//     messages,
//     experimental_generateMessageId: createIdGenerator({
//       prefix: "msgs",
//       size: 16,
//     }),
//     async onFinish({ response }) {
//       await saveChat({
//         id,
//         title,
//         userId
//       });

      
//     },
//   });

//   // consume the stream to ensure it runs to completion & triggers onFinish
//   // even when the client response is aborted:
//   result.consumeStream(); // no await

//   return result.toDataStreamResponse();
// }

import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages} = await req.json();
  console.log('Chat: ', messages)

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: 'You are a helpful assistant.',
    messages,
    // async onFinish({response}){
    //   await saveChat({})
    // }
  });
  console.log(result.toDataStreamResponse())
  return result.toDataStreamResponse();
}
