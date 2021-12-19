import { atom } from "recoil";

export const modalState = atom({
    key: 'modalState',
    default: false,
})

export const PhotoModalState = atom({
    key: 'PhotoModalState',
    default: false,
})

export const StoryModalState = atom({
    key: 'StoryModalState',
    default: false,
})

export const StoryViewModalState = atom({
    key: 'StoryViewModalState',
    default: false,
})

export const sendMessageState = atom({
    key: 'sendMessageState',
    default: false,
})

export const messageOpenState = atom({
    key: 'messageOpenState',
    default: false,
})

export const messageUserSelectedState = atom({
    key: 'messageUserSelectedState',
    default: null,
})

export const selectedUserState = atom({
    key: 'selectedUserState',
    default: null,
})

export const realUserState = atom({
    key: 'realUserState',
    default: null,
})

export const selectedFileState = atom({
    key: 'selectedFileState',
    default: "",
})