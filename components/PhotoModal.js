import { useRecoilState } from "recoil"
import { modalState, PhotoModalState, realUserState, selectedUserState } from "../atoms/modalAtom"
import {Dialog, Transition} from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc, getDoc } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
function PhotoModal() {
    const {data: session,status} = useSession();
    const [open, setOpen] = useRecoilState(PhotoModalState);
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [realUser, setRealUser] = useRecoilState(realUserState)
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState)
    const uploadPost = async () => {
        if(loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db,'inbox',realUser,'messages'),{
            timestamp: serverTimestamp(),
            senderId: session.user.uid,
            receiverId: selectedUser,
        })  

        const imageRef = ref(storage, `messages/${docRef.id}/image`);
        await uploadString(imageRef,selectedFile, "data_url").then(async snapshot=>{
            const downloadURL = await getDownloadURL(imageRef);
            await getDoc(doc(db,'users',selectedUser)).then((data)=>{
                updateDoc(doc(db,'inbox', realUser,'messages',docRef.id), {
                    image: downloadURL,
                    receiverImg: data.data().userImage,
                })
            })
        });

        setOpen(false);
        setLoading(false);
        setSelectedFile(null);

    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
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
                    <div className="inline-block align-middle my-52  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-sm w-full sm:p-6">
                        <div className="">
                            {selectedFile ? (
                                <img src={selectedFile} onClick={()=> setSelectedFile(null)} className='w-full object-contain cursor-pointer' alt="" />
                            ) : (
                                <>
                                    <div
                                    onClick={()=> filePickerRef.current.click()}
                                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                                    >
                                    <CameraIcon  className='h-6 w-6 text-red-600' aria-hidden='true' />
                                    </div>
                                </>
                            )}
                            
                            <div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
                                        Send a Photo
                                    </Dialog.Title>
                                    <div className="">
                                        <input 
                                            ref={filePickerRef} 
                                            type="file" hidden
                                            onChange={addImageToPost}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6">
                                <button
                                    type='button'
                                    onClick={uploadPost}
                                    disabled={!selectedFile}
                                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300'
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
}

export default PhotoModal
