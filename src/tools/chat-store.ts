import { generateId } from "ai";
import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import uuid from 'react-uuid';

// import { readFile } from "fs/promises";
import path from "path";
import { getChatById } from "~/lib/db/queries";
// import { Message } from "ai";

// export async function loadChat(id: string): Promise<Message[]> {

//   return JSON.parse(await readFile(getChatFile(id), "utf8"));
// }

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

// export async function loadChat(id: string): Promise<Message[]> {
//   return getChatById(id);
// }
// export async function saveChat({
//   id,
//   messages,
// }: {
//   id: string;
//   messages: Message[];
// }): Promise<void> {
//   const content = JSON.stringify(messages, null, 2);
//   await writeFile(getChatFile(id), content);
// }
