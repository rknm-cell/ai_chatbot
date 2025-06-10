import "server-only";
import { asc, eq } from "drizzle-orm";
import { chat, message, type DBMessage, type Chat } from "./schema";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

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
  visibility,
}: {
  id: string;
  userId: string;
  title: string;
  visibility: string;
}) {
  return await db.insert(chat).values({
    id,
    createdAt: new Date(),
    userId,
    title,
    visibility,
  });
}

export async function getChatById({ id }: { id: string }) {
  const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
  return selectedChat;
}

export async function saveMessages({
  messages,
}: {
  messages: Array<DBMessage>;
}) {
  return await db.insert(message).values(messages);
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

