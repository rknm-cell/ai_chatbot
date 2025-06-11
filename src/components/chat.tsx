"use client";
import { useChat } from "@ai-sdk/react";
import { Input } from "./ui/input";
import { Messages } from "./ui/messages";
import { useAutoResume } from "~/app/hooks/use-auto-resume";


export function Chat() {
  const { experimental_resume, data, setMessages } = useChat({ id });

  useAutoResume({
    autoResume: true,
    initialMessages: [],
    experimental_resume,
    data,
    setMessages,
  })

  return (
    <div>
      <Messages />
      <Input />
    </div>
  );
}
