import { PlusCircleIcon } from "@heroicons/react/solid"
import { doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { selectedFileState, StoryModalState, StoryViewModalState } from "../atoms/modalAtom"
import { db } from "../firebase";
import StoryModal from "./StoryModal"
import ViewStoryModal from "./ViewStoryModal";

function Story({userId,img, username,active}) {
    const {data: session,status} = useSession();
    const [open, setOpen] = useRecoilState(StoryModalState)
    const [openStory, setOpenStory] = useRecoilState(StoryViewModalState)
    const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState)
    const handleClick = () =>{
        
        setOpenStory(true)
        getDoc(doc(db,'story',userId)).then((data)=>{
            setSelectedFile(data.data().image);
        })
    }
    
    return (
        <div>
            {img && !active && (
                <>
                    <img onClick={handleClick} className='h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out' src={img} alt="" />
                    <p className='text-xs w-14 truncate text-center'>{username}</p>   
                </>
            )}
           {
               active && userId!==session?.user?.uid && (
                   <>
                    <div onClick={()=>setOpen(true)} className="relative">
                     <img className='h-14 w-14 rounded-full p-[1.5px] object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out' src={img} alt="" />
                     <PlusCircleIcon className="h-6 text-blue-600 absolute left-[2.12rem] cursor-pointer bottom-3 bg-white rounded-full "/>
                    <p className='text-xs w-14 truncate text-center'>{username}</p>   
                   </div>
                   </>
            )
        }
        <ViewStoryModal userId={userId} />
        </div>
    )
}

export default Story
