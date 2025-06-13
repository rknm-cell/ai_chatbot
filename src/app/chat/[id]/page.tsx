import { loadChat } from '~/tools/chat-store';
import Chat from '~/components/ui/chat';
import { session } from '~/lib/db/schema';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params; // get the chat ID from the URL
  const messages = await loadChat(id); // load the chat messages
  return <Chat id={id} initialMessages={messages} />; // display the chat
}