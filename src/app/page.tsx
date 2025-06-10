"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const [prompt] = useDebounce(text, 1000);

  async function handleGenerateResponse() {
    setIsLoading(true);
    const response = await fetch("/api/completion", {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const data = (await response.json()) as { text: string };

    setMessages((prev) => [...prev, { role: "user", content: data.text }]);
    setText("");
    setIsLoading(false);
  }

  return (
    <div className="flex h-dvh flex-col">
      <div className="bg-amber-500 p-4 shadow-md">
        <h1 className="text-xl font-bold text-white">Chat</h1>
      </div>
      <div className="flex-1 overflow-y-auto bg-amber-50 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 max-w-[80%] ${
              message.role === "user" ? "ml-auto" : "mr-auto"
            }`}
          >
            <div
              className={`rounded-lg p-3 ${
                message.role === "user"
                  ? "rounded-br-none bg-amber-500 text-white"
                  : "rounded-bl-none bg-white shadow-md"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        <Input
          className="flex-1 border-amber-200 bg-amber-50 "
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleGenerateResponse();
            }
          }}
          disabled={isLoading}
        />

        <Button
          onClick={handleGenerateResponse}
          disabled={isLoading}
          className="bg-amber-500"
        >
          Generate
        </Button>
      </div>
    </div>
  );
}
