"server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { chat, message, type Message } from "./schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function saveChatToDB({ id }: { id: string }) {
  try {
    return await db.insert(chat).values({
      id,
      messages: [],
      createdAt: new Date(),
    });
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
}

export async function saveMessages({
  id,
  chatId,
  role,
  content,
}: {
  id: string;
  chatId: string;
  role: string;
  content: string;
}) {
  try {
    return await db.insert(message).values({
      id,
      chatId,
      role,
      content,
      createdAt: new Date(),
    });
  } catch (error) {
    const e = error as Error;
  
  return {
    success: false,
    message: e.message || "An unknown error occurred.",
  };
  }
}
