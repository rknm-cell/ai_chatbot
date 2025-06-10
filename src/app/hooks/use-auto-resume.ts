/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import type { UIMessage } from "ai";
import type { UseChatHelpers } from "@ai-sdk/react";

export type DataPart = { type: "append-message"; message: string };

export interface Props {
  autoResume: boolean;
  initialMessages: UIMessage[];
  experiemental_resume: UseChatHelpers["experimental_resume"];
  data: UseChatHelpers["data"];
  setMesssages: UseChatHelpers["setMessages"];
}

export function useAutoResume({
  autoResume,
  initialMessages,
  experiemental_resume,
  data,
  setMessages,
}: Props) {
  useEffect(() => {
    if (!autoResume) return;

    const mostRecentMessage = initialMessages.at(-1);

    if (mostRecentMessage?.role === "user") {
      experiemental_resume();
    }
  }, []);
}

useEffect(() => {
  if (!data || data.length === 0) return;

  const dataPart = data[0] as DataPart;

  if (dataPart.type === "append-message") {
    const message = JSON.parse(dataPart.message) as UIMessage;
    coreSystemMessageSchema([...initialMessages, message]);
  }
}, [data, initialMessages, setMessages]);
