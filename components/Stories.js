import faker from "faker";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { db } from "../firebase";
import Story from "./Story";
import StoryModal from "./StoryModal";


function Stories() {
    const {data: session} = useSession();
    const [suggestions, setSuggestions] = useState([]);
    const [stories, setStories] = useState([]);
    const [storyPost, setStoryPost] = useState(false)
    useEffect(()=>
        onSnapshot(query(collection(db,'story'),orderBy('timestamp','desc')),snapshot=>{
            setStories(snapshot.docs);
        }),
        [db]
    )

    useEffect(()=>{
        if(session)
        {
        stories.map(profile=>{
            (profile.data().userId===session.user.uid && setStoryPost(true))    
            if(parseInt(Date().split(' ')[2]) - parseInt(profile.data().timestamp.split(' ')[2]) === 1)
            {
                console.log("yo")
                if(parseInt(Date().split(' ')[4].split(':')[0]) > parseInt(profile.data().timestamp.split(' ')[4].split(':')[0]))
                {
                    deleteDoc(doc(db,'story',profile.data().userId))
                }
            }
            if(parseInt(Date().split(' ')[2]) - parseInt(profile.data().timestamp.split(' ')[2]) > 1 || parseInt(Date().split(' ')[2]) - parseInt(profile.data().timestamp.split(' ')[2]) < 0)
            {
                console.log("yo")
                deleteDoc(doc(db,'story',profile.data().userId))
            }
            
            
            
        })
    } 
    },[stories,db])
    return (
        <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black '>
            <StoryModal />
            {/* <ViewStoryModal /> */}
            {session && (
                (!storyPost && (
                    <Story username='Add a Story' active={true} img={session.user.image}/>
                ))
            )}
            {stories.map(profile=>(
                <Story key={profile.id} userId={profile.data().userId} img={profile.data().userImg} username={profile.data().userName} />
            ))}
        </div>  
    )
}

export default Stories