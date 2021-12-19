import { useEffect, useState } from "react"
import faker from "faker";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
function Suggestions() {
    
    const [suggestions,setSuggestions] = useState([]);

    useEffect(()=>{
        getDocs(collection(db,'users')).then((doc)=>{
            setSuggestions(doc.docs.map((doc) => ({...doc.data()})))
        })
    },[])

    return (
        <div className='mt-4 ml-10'>
            <div className="flex justify-between text-sm mb-5">
                <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
                <button className='text-gray-600 font-semibold'>See All</button>
            </div>
            {
                suggestions.map(profile=>(
                    <div key={profile.id} className="flex items-center justify-between mt-3">
                        <img className='w-10 h-10 rounded-full border p-[2px]' src={profile.userImage} alt="" />
                        <div className="flex-1 ml-4">
                            <h2 className='font-semibold text-sm'>{profile.username}</h2>
                        </div>
                        <button className='text-blue-400 text-sm  font-bold'>Follow</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Suggestions
