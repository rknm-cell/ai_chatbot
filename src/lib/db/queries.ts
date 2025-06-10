import "server-only";
import { and, asc, count, desc, eq, type SQL } from "drizzle-orm";
import {chat, message, type Message } from "./schema";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);
export async function saveChat({
    id,
    userId,
    title,
}: {
    id: string;
    userId: string;
    title: string;
}) {
    try {
    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      userId,
      title,
      
    });
  } catch (error) {
    console.error("Save chat error: ", error);
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
  } catch (error) {
    console.error("Failed to get messages by id", error);
  }
}

export async function saveMessages({
  messages,
}: {
  messages: Array<Message>;
}) {
  try {
    return await db.insert(message).values(messages);
  } catch (error) {
    console.error('bad_request:database', 'Failed to save messages', error);
  }
}