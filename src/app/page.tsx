'use client';

import { useState } from "react";

export default function Page(){
  const [generation, setGeneration] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  async function handleGenerateResponse(){
    const response = await fetch('/api/completion', {
      method: 'POST',
      body: JSON.stringify({
        prompt: 'Why is the sky blue?',
      })
    })
    const data = await response.json() as {text: string};
    setText(data.text);
    setIsLoading(false);
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <div
        className="p-2 bg-zinc-100 cursor-pointer"
         onClick={handleGenerateResponse}
      >
        Generate

      </div>
      {isLoading ? 'Loading...' : <div data-testid="generation">generation</div>}
    </div>
  )
}