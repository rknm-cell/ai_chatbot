'use client';

import {Message, useChat} from '@ai-sdk/react';

export default function Chat({
  id,
  initialMessages,
}:{ id?: string | undefined; initialMessages?: Message[] } = {}) {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    id, // uses provided chat ID
    initialMessages, // initial messages if provided
    sendExtraMessageFields: true, // send id and createdAt for each message
  });

  //simplified rendering code, extend as needed:
  return(
    <div>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.content}
          </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange}/>
      </form>

    </div>
  )

}
