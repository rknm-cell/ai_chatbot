"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";


export default function Page() {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
    stop,
    reload,
  } = useChat({});


  const handleDelete = (id: string) => {
    setMessages(messages.filter(message => message.id !== id))
  }

  return (
    <div className="bg-zinc-500 max-h-10">
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
          <button onClick={() => handleDelete(message.id)}>Delete</button>
        </div>
      ))}
      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}
      {(status === "submitted" || status === "streaming") && (
        <div>
          {status === "submitted" && <Spinner />}
          <Button type="button" onClick={() => stop()}>
            {" "}
            Stop{" "}
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={error != null}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
