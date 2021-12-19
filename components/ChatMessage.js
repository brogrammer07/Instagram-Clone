import { collection, getDocs } from "firebase/firestore"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { messageUserSelectedState, realUserState } from "../atoms/modalAtom"
import { db } from "../firebase"



function ChatMessage({id,msg,senderId,receiverId ,senderImg, receiverImg, img}) {
    
    const {data: session} = useSession();
    const [realUser, setRealUser] = useRecoilState(realUserState)
    const [userSelected,setUserSelected] = useRecoilState(messageUserSelectedState)
    getDocs(collection(db,'inbox',realUser,'messages'))
    console.log("Hello",senderId)
    console.log(session.user.uid)
    return (
        (realUser===userSelected)?(
            (senderId===session.user.uid)?(
                <div className="flex justify-end">
                <div className="flex  rounded-3xl max-h-[30rem] px-4 py-2 space-x-2 ">
                    {(img)?(
                        <img className="max-w-[20rem] rounded-2xl object-contain" src={img} alt="" />
                    ):(
                    <p className="flex items-center bg-gray-200 rounded-3xl px-4 py-2 max-w-[20rem]">
                        {msg}
                    </p>
                    )}
                </div>
            </div>
            ):(
                <div className="flex justify-start">
                <div className="flex rounded-3xl px-4 py-2 space-x-2">
                    <img src={senderImg} className="h-7 rounded-full self-end" alt="" />
                    {(img)?(
                        <img className="max-w-[20rem] rounded-2xl object-contain" src={img} alt="" />
                    ):(
                    <p className="flex items-center border rounded-full px-4 py-2 max-w-[20rem]">
                        {msg}
                    </p>
                    )}
                </div>
            </div>
            )
        ):(
            (receiverId===session.user.uid)?(
                <div className="flex justify-end">
                <div className="flex  rounded-3xl max-h-[30rem] px-4 py-2 space-x-2 ">
                    {(img)?(
                        <img className="max-w-[20rem] rounded-2xl object-contain" src={img} alt="" />
                    ):(
                    <p className="flex items-center bg-gray-200 rounded-3xl px-4 py-2 max-w-[20rem]">
                        {msg}
                    </p>
                    )}
                </div>
            </div>
            ):(
                <div className="flex justify-start">
                <div className="flex rounded-3xl px-4 py-2 space-x-2">
                    <img src={receiverImg} className="h-7 rounded-full self-end" alt="" />
                    {(img)?(
                        <img className="max-w-[20rem] rounded-2xl object-contain" src={img} alt="" />
                    ):(
                    <p className="flex items-center border rounded-full px-4 py-2 max-w-[20rem]">
                        {msg}
                    </p>
                    )}
                </div>
            </div>
            )
        )
                
     
                

    )
}

export default ChatMessage
