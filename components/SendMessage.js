import {Dialog, Transition} from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { messageUserSelectedState, selectedUserState, sendMessageState } from "../atoms/modalAtom";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../firebase";

function SendMessage() {
    const {data: session} = useSession();
    const [user,setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState)
    useEffect(()=>{
        const getUsers = async () => {
            const usersList = await getDocs(query(collection(db, "users"), where("userId", "!=", session.user.uid)));
            setUser(usersList.docs.map((doc) => ({...doc.data()})));
        }
        getUsers();
    },[user])
    const [userSelected,setUserSelected] = useRecoilState(messageUserSelectedState)
    const [open, setOpen] = useRecoilState(sendMessageState);
    return <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setOpen}>
            <div className='flex items-center justify-center minh-[800px] sm:min-h-screen pt-4 pb-20 text-center sm:block sm:p-0'>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enterTo='opacity-100 sm:translate-y-0 sm:scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 sm:translate-y-0 sm:scale-100'
                    leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                >
                    <div className="inline-block align-bottom bg-white rounded-lg  text-left overflow-hidden scrollbar-hide shadow-xl transform transition-all  sm:align-middle sm:max-w-sm sm:w-full">
                        <div className="">
                            <div className="flex items-center justify-between mx-4 my-2 ">
                                <XIcon onClick={()=>setOpen(false)}  className='h-7 cursor-pointer' />
                                <p className='font-semibold'>New Message</p>
                                <p className='text-blue-300 cursor-default'>Next</p>
                            </div>
                            <hr className='text-gray-500'/>
                                <p className='font-semibold text-sm my-3 mx-4'>Suggested</p>
                            <div className="overflow-y-scroll scrollbar-hide max-h-96">
                                <div className="flex flex-col">
                                    {user.map((handle) => {
                                        return  <div onClick={()=>{setUserSelected(handle.userId + session.user.uid ); setOpen(false); setSelectedUser(handle.userId) }}  className="hover:bg-gray-50">
                                                <div className="flex flex-col mx-4 my-2">
                                                    <div className='flex items-center cursor-pointer space-x-3 '>
                                                        <img className='rounded-full h-10' src={handle.userImage} alt="" />
                                                        <div className="">
                                                            <h1 className='text-sm font-semibold'>{handle.name}</h1>
                                                            <p className='text-xs text-gray-500'>{handle.username}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
}

export default SendMessage
