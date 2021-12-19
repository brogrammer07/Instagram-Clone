import { useSession } from "next-auth/react";
import ChatBox from "./ChatBox";
import Message from "./Message";
import SendMessage from "./SendMessage";

function messages() {
    const {data: session} = useSession();
    return (
        <main className='grid grid-cols-2 md:grid-cols-3 md:max-w-5xl xl:grid-cols-3 xl:max-w-5xl mx-auto overflow-y-hidden mb-3'>
            <section className='col-span-2 md:col-span-1'>
                <Message />
            </section>
            <section className='col-span-2 md:col-span-2 xl:col-span-2'>
                    <ChatBox />
                    <SendMessage />
            </section> 
        </main>
    )
}

export default messages
