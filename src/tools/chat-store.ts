
// import { generateId } from "ai";
import { existsSync, mkdirSync } from "fs";
import { writeFile, readFile } from "fs/promises";
import { type Message } from "ai";
import uuid from 'react-uuid';

import path from "path";

export async function createChat(): Promise<string> {
  const id = uuid(); // generate a unique chat ID
  console.log("type of id:",typeof(id))
  await writeFile(getChatFile(id), "[]"); // create an empty chat file
  return id;
}

function getChatFile(id: string): string {
  const chatDir = path.join(process.cwd(), ".chats");
  if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
  return path.join(chatDir, `${id}.json`);
}

export async function loadChat(id: string): Promise<Message[]> {
  // eslint-disable-next-line
  return JSON.parse(await readFile(getChatFile(id), 'utf8'));
}

export async function saveChat({
  id,
  messages,
}: {
  id: string;
  messages: Message[];
}): Promise<void> {
  const content = JSON.stringify(messages, null, 2);
  await writeFile(getChatFile(id), content);
}