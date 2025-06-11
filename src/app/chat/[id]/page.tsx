// import { loadChat } from '~/tools/chat-store';
import Chat from '~/ui/chat';
import type { DBMessage } from '~/lib/db/schema';
import { getMessagesByChatId } from '~/lib/db/queries';
import type { UUID } from 'crypto';

export default async function Page(props: { params: Promise<{ id: UUID }> }) {
  const id = await props.params; // get the chat ID from the URL
  console.log("Type of", typeof(id))
  const messages: DBMessage[]  = await getMessagesByChatId(id); // load the chat messages
  console.log('Messages :', messages)
  return <Chat id={id} initialMessages={messages} />; // display the chat
}

