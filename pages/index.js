import Head from 'next/head'
import Modal from '../components/Modal'
import Header from '../components/Header'
import Feed from '../components/Feed'
import { useRecoilValue } from 'recoil'
import { messageOpenState } from '../atoms/modalAtom'
import Messages from '../components/Messages'


export default function Home() {
  const messageOpen = useRecoilValue(messageOpenState);
  return (
    (messageOpen)?(
      <div className="bg-gray-50 h-screen overflow-y-hidden scrollbar-hide">
      <Head>
        <title>Instagram Clone</title>
      </Head>
      <Modal />
      <Header />
      <Messages />
      
  </div>) : (
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
      <title>Instagram Clone</title>
    </Head>
    <Modal />
    <Header />
    <Feed />
  </div>)
    
  )
}
