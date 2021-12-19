import Image from "next/image"
import {HeartIcon, MenuIcon, PaperAirplaneIcon, PlusCircleIcon, SearchIcon, UserGroupIcon} from "@heroicons/react/outline"
import {HomeIcon} from "@heroicons/react/solid"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { messageOpenState, messageUserSelectedState, modalState } from "../atoms/modalAtom";
import { useEffect, useState } from "react";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase";
function Header() {

    const {data: session,status} = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);
    const [verified, setVerified] = useState(false);
    const [messageOpen, setMessageOpen] = useRecoilState(messageOpenState);
    const [userSelected,setUserSelected] = useRecoilState(messageUserSelectedState)
    const handleOnClick = (e) =>{
        if(verified===false)
        {
            setVerified(true);
        }
        setMessageOpen(true);
        
    }

    const homeIconClick = (e) =>{
        ()=>router.push('/')
        setMessageOpen(false);
        setUserSelected(null)
    }

    useEffect(()=>{
        if(session)
        {
            setDoc(doc(db,'users',session?.user?.uid),{
                userId: session.user.uid,
                name: session?.user?.name,
                username: session?.user?.username,
                userImage: session?.user?.image,
            })
        }
    },[verified])

    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
                <div onClick={()=>router.push('/')} className="relative hidden lg:inline-grid  w-24 cursor-pointer">
                    <Image
                        src='https://links.papareact.com/ocw'
                        layout='fill'
                        objectFit='contain' 
                    />
                </div>
                <div onClick={()=>router.push('/')} className="relative w-10  lg:hidden flex-shrink-0 cursor-pointer">
                <Image
                        src='https://links.papareact.com/jjm'
                        layout='fill'
                        objectFit='contain' 
                    />
                </div>
                <div className="max-w-xs">
                    <div className="relative mt-1 p-3 rounded-md">
                        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none ">
                            <SearchIcon className='h-5 w-5 text-gray-500' />
                        </div>
                        <input className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md' type="text" placeholder='Search' />
                    </div>
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <HomeIcon onClick={homeIconClick} className='navBtn' />
                    <HomeIcon onClick={homeIconClick} className='h-6 md:hidden cursor-pointer' />
                    <PaperAirplaneIcon onClick={handleOnClick} className='h-6 md:hidden cursor-pointer rotate-45' />
                    <PlusCircleIcon onClick={() => setOpen(true)} className='h-6 md:hidden cursor-pointer' />
                    {session ? (
                        <>
                            <div className="relative navBtn">
                            <PaperAirplaneIcon onClick={handleOnClick} className='navBtn rotate-45' />
                            <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">3</div>
                            </div>
                            <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn' />
                            <UserGroupIcon className='navBtn' />
                            <HeartIcon className='navBtn' />
                            <img onClick={signOut} src={session.user?.image} alt="profile pic" className='h-10 w-10 rounded-full cursor-pointer' />
                        </>
                    ) : (
                        <button onClick={signIn}>Sign In</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
