"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseText, setResponseText] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [prompt] = useDebounce(text, 1000);

  async function handleGenerateResponse() {
    const response = await fetch("/api/completion", {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const data = (await response.json()) as { text: string };
    setResponseText(data.text);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      {isLoading ? (
        "Loading..."
      ) : (
        <div data-testid="generation">{responseText}</div>
      )}
      <input
      placeholder="Start chatting"
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>
      <div
        className="cursor-pointer bg-zinc-100 p-2"
        onClick={handleGenerateResponse}
      >
        Generate
      </div>
    </div>
  );
}
