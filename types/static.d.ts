import {Dispatch, SetStateAction} from "react";

export interface IPosts {
    id: number;
    title: string;
    body: string;
    userId: number
}

export interface FormData {
    title: string;
    body: string;
}

export type ContextType = {
    allPosts: IPosts[],
    setAllPosts: Dispatch<SetStateAction<IPosts[]>>,
    postCount: number,
    setPostCount:Dispatch<SetStateAction<number>>,
    id: number | undefined,
    setId:Dispatch<SetStateAction<number | undefined>>,
    showModal: boolean,
    setShowModal:Dispatch<SetStateAction<boolean>>,
    post: IPosts | undefined,
    setPost:Dispatch<SetStateAction<IPosts | undefined>>,
    data: FormData,
    setData:Dispatch<SetStateAction<FormData>>
};



