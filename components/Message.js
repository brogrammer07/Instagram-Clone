import { collection, getDocs, query, where } from "@firebase/firestore";
import { ChevronDownIcon, PencilAltIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { messageUserSelectedState, selectedUserState, sendMessageState } from "../atoms/modalAtom";
import { db } from "../firebase";

function Message() {
    const {data: session} = useSession();
    const [user,setUser] = useState([]);
    const [userSelected,setUserSelected] = useRecoilState(messageUserSelectedState)
    const [open, setOpen] = useRecoilState(sendMessageState);
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState)
    useEffect(()=>{
        const getUsers = async () => {
            const usersList = await getDocs(query(collection(db, "users"), where("userId", "!=", session.user.uid)));
            setUser(usersList.docs.map((doc) => ({...doc.data()})));
        }
        getUsers();
    },[])
    return (
        <div className={`md:block ${userSelected && "hidden"}`}>
            <div className="bg-white md:my-7 border rounded-sm h-[83vh]">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between my-5">
                        <div className=""></div>
                        <h1 className='flex ml-8 space-x-2 cursor-pointer'><span className='font-semibold text-base'>{session.user.username}</span> <ChevronDownIcon className='h-6'/></h1>
                        <PencilAltIcon onClick={()=>setOpen(true)} className='h-6 mr-5 cursor-pointer' />
                    </div>

                    <hr className='text-gray-400' />
                    <div className="flex items-center my-3 justify-evenly space-x-4 cursor-pointer">
                        <h1 className='font-semibold text-sm md:text-base lg:text-lg'>PRIMARY</h1>
                        <h1 className='font-semibold text-gray-400 text-sm  md:text-base lg:text-lg md:block'>GENERAL</h1>
                        <h1 className='text-blue-500 text-sm md:text-base lg:text-lg'>Requests</h1>
                    </div>
                    <hr className='text-gray-400' />
                            {user.map((handle) => {
                              return  <div  className='hover:bg-gray-50'>
                                    <div onClick={()=>setSelectedUser(handle.userId)} className="flex flex-col my-3 mx-5">
                                        <div onClick={()=>setUserSelected(handle.userId + session.user.uid )} className='flex items-center cursor-pointer space-x-3 '>
                                            <img  className='rounded-full h-12 md:h-12' src={handle.userImage} alt="" />
                                            <div className="">
                                                <h1 className='text-lg md:text-base font-semibol truncated'>{handle.name}</h1>
                                                <p className='text-sm text-gray-500 truncate'>{handle.username}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                </div>
            </div>
        </div>
    )
}

export default Message
