import { redirect } from 'next/navigation';
import { saveChatToDB } from '~/lib/db/queries';
// import { saveChatToDB } from '~/lib/db/queries';
import { createChat } from '~/tools/chat-store';

export default async function Page() {
  const id = await createChat(); // create a new chat
  // if (id) {
  //   saveChatToDB(id, );
  // } else {
  //   redirect(`/dashboard`);
  // }
  redirect(`/chat/${id}`); // redirect to chat page, see below
}