'use client';

import { type Message, useChat } from '@ai-sdk/react';
import Spinner from './spinner';
import { Input } from './input';
import { Button } from './button';

export default function Chat({
  id,
  initialMessages,
}: { id?: string | undefined; initialMessages?: Message[] } = {}) {
  const { input, handleInputChange, handleSubmit, error, reload, status, messages } = useChat({
    id, // use the provided chat ID
    initialMessages, // initial messages if provided
    sendExtraMessageFields: true, // send id and createdAt for each message
  });

  // simplified rendering code, extend as needed:
  return (
  
     <>
      <div>Say something</div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}

      {(status === "submitted" || status === "streaming") && (
        <div>
          {status === "submitted" && <Spinner/>}
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}
      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={status !== "ready"}
        />

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}