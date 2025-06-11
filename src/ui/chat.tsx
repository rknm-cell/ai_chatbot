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

    <div className="flex h-dvh flex-col bg-gray-100 dark:bg-gray-900">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow">
        <div className="max-w-4xl mx-auto py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">AI Chat</h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
     {error && (
          <div className="max-w-4xl mx-auto mt-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error!</strong>
              <Button
                onClick={() => reload()}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Retry
              </Button>
            </div>
          </div>
        )}
      {(status === "submitted" || status === "streaming") && (
          <div className="max-w-4xl mx-auto mt-4 flex items-center gap-2">
            <span className="text-gray-500">
              {status === "submitted" ? "Thinking..." : "Streaming..."}
            </span>
            <Button
              onClick={() => stop()}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Stop
            </Button>
          </div>
        )}

      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto flex gap-4 items-center"
        >
          <Input
            className="flex-1 h-12 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            disabled={status !== "ready"}
          />
          <Button
            type="submit"
            disabled={status !== "ready"}
            className="h-12 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
    </div>
  );
}
