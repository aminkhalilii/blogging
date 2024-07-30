import React from 'react';

import {ContextType, IPosts,FormData} from "~/types/static";
import {useState} from "react";

export const Context = React.createContext<ContextType | null>(null);

const Provider: React.FC<React.ReactNode> = ({ children }) => {
    const [allPosts, setAllPosts] = useState<IPosts[]>([]);
    const [postCount, setPostCount] = useState<number>(1);
    const [id,setId]=useState<number | undefined>()
    const [showModal, setShowModal] = useState(false);
    const [post,setPost]=useState<IPosts>()
    const [data, setData] = useState<FormData>({
        title: '',
        body: '',
    });

    return <Context.Provider value={{ allPosts, setAllPosts ,postCount,setPostCount,id,setId,showModal, setShowModal,post,setPost,data, setData}}>{children}</Context.Provider>;
};

export default Provider;
