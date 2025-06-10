import "server-only";
import { asc, eq } from "drizzle-orm";
import { chat, message, type DBMessage, type Chat, streamIds } from "./schema";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { UUID } from "crypto";
import { generateId } from "ai";
import { writeFile } from "fs";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

// Get user query not necessary at this moment
// export async function getUser(email: string): Promise<Array<User>> {
//   try {
//     return await db.select().from(user).where(eq(user.email, email));
//   } catch {
//     throw new Error

//   }

// }

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: UUID;
  userId: string;
  title: string;
}) {
  return await db.insert(chat).values({
    id,
    createdAt: new Date(),
    userId,
    title,
  });
}

export async function getChatById({ id }: { id: string }) {
  const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
  return selectedChat;
}

export async function saveMessages({
  id,
  chatId,
  content,
  createdAt,
}: {
  id: UUID;
  chatId: UUID;
  content: string;
  createdAt: Date;
}) {
  return await db.insert(message).values({
    id,
    chatId,
    content,
    createdAt
  });
}

export async function getMessagesByChatId({ id }: { id: string }) {
  // try {
  //   return await db
  //     .select()
  //     .from(message)
  //     .where(eq(message.chatId, id))
  //     .orderBy(asc(message.createdAt));
  // } catch (error) {
  //   console.error("Failed to get messages by id", error);
  // }
  
  console.log("before const message:", id)
  const messages = await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
      
  console.log("const message", messages)
    if (!messages.length){
      return []
    } 
    return messages
}


// export async function loadStreams(chatId: string){
//   try{
//     const streams = await db.select().from(streamIds).where(eq(streamIds.chatId, chatId)).orderBy(asc(streamIds.createdAt))
//     return streams.map(asc(streamIds.createdAt))
//   }
// }

// export async function appendStreamId({
//   chatId: string,
//   streamId: string,
// })
