"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

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
    <div className="flex flex-col gap-2 p-2 justify-center align-middle bg-amber-400 h-dvh w-dvw">
      {isLoading ? (
        "Loading..."
      ) : (
        <div data-testid="generation">{responseText}</div>
      )}
      <Input className="bg-amber-100"
      placeholder="Start chatting"
        onChange={(e) => {
          setText(e.target.value);
        }}></Input>
      
      <Button onClick={handleGenerateResponse}>Generate</Button>
      
    </div>
  );
}
