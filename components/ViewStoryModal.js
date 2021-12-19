import { useRecoilState } from "recoil"
import {selectedFileState, StoryViewModalState } from "../atoms/modalAtom"
import {Dialog, Transition} from "@headlessui/react";
import { Fragment, useEffect} from "react";
import { useSession } from "next-auth/react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
function ViewStoryModal({userId}) {
    const {data: session,status} = useSession();
    const [open, setOpen] = useRecoilState(StoryViewModalState)
    const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState)
    
    useEffect(()=>{
        if(!selectedFile){
            exit()
        }
    },[selectedFile])
    const exit = () =>{
        setOpen(false)
    } 
    
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
                    <div className="inline-block align-middle my-52 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle sm:max-w-sm sm:w-full ">
                        <div className="relative">
                            <img src={selectedFile} onClick={()=> setSelectedFile(null)} className='w-full object-contain cursor-pointer' alt="" />
                            <div className="absolute bottom-3 left-[82%]">
                                <CountdownCircleTimer 
                                    isPlaying
                                    duration={10}
                                    strokeWidth={6}
                                    size={50}
                                    colors={[
                                        ["#004777",0.33],
                                        ["#F7B801",0.33],
                                        ["#A30000",0.33],
                                    ]}
                                >
                                    {({remainingTime})=>{
                                        if(remainingTime===0){
                                            exit();
                                        }
                                        return remainingTime
                                    }}
                                </CountdownCircleTimer>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
}

export default ViewStoryModal
