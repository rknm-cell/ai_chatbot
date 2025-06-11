"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
    error,
    reload,
  } = useChat({});

  return (
    <div className="flex h-dvh flex-col justify-center bg-slate-700">
      <p className="text-2xl text-black">Text Chat</p>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}
      {error && (
        <>
          <div className="text-3xl text-red-500">
            Error
          </div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}
      {(status === "submitted" || status === "streaming") && (
        <div>
          {status === "submitted" && "Thinking hard..."}
          <Button
            className="text-l h-4 w-4"
            type="button"
            onClick={() => stop()}
          >
            Pause
          </Button>
        </div>
      )}

      <div className="flex flex-col justify-center">
        <form onSubmit={handleSubmit}>
          <Input
            className="h-20 w-200"
            name="prompt"
            value={input}
            onChange={handleInputChange}
            disabled={status !== "ready"}
          />
          <Button
            className="text-l bg-accent h-10 w-10 rounded-4xl"
            type="button"
            onClick={() => stop()}
          >
            Pause
          </Button>
          <Button className="h-10 w-20 rounded-3xl bg-teal-600" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
