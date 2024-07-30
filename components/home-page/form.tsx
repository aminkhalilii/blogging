import React, {useState, ChangeEvent, useContext, useEffect} from "react";
import {Context} from "~/context/context";
import {ContextType, FormData, IPosts} from "~/types/static";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

interface FormProps {
    onSubmit?: (data: FormData) => void;
    initialData?: IPosts;
}
const Form: React.FC<FormProps> = ({initialData}) => {
    const { setAllPosts,setData,data } = useContext(Context) as ContextType;

    const [formData, setFormData] = useState<FormData>({
        title: initialData?.title || '',
        body: initialData?.body|| '',
    });

    const { title, body } = formData;


    useEffect(()=>{
        setData({
            title: initialData?.title || '',
            body: initialData?.body || ''
        })
    },[])


    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    };

    const mutation = useMutation(
        async () => {
            // eslint-disable-next-line no-useless-catch
            try {
                const response = await axios.post(
                    "https://jsonplaceholder.typicode.com/posts",
                    {
                        title: title,
                        body: body,
                        userId: 1
                    },
                    {
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        {
            onSuccess(data) {
                console.log("Successful", {data});
                setFormData({title: "",
                    body: "",})
            },
            onError(error) {
                console.log("Failed", {error});
            },
            onSettled(res) {
                setAllPosts((prev)=>[res,...prev])
                console.log("Mutation completed.");
                setFormData({title: "",
                    body: "",})
            },
        }
    );

    async function handleSubmitPost(e:React.FormEvent) {
        e.preventDefault();
        await mutation.mutateAsync();
    }

    return (
        <form onSubmit={handleSubmitPost} className="w-11/12">
            <div className="flex-grow px-2 pt-3 pb-1 relative">
                <div className="px-2">
                    <input
                        type="text"
                        name="title"
                        placeholder="title post"
                        value={title}
                        onChange={handleChange}
                        className="bg-transparent w-full  placeholder-gray-700 focus:outline-none text-white bg-dark-lighter text-lg py-2 px-2 rounded-md"
                        required
                    />
                </div>
                <div className="px-2 mt-3">
          <textarea
              name="body"
              placeholder="description"
              value={body}
              onChange={handleChange}
              className="bg-transparent w-full  placeholder-gray-700 focus:outline-none text-white bg-dark-lighter text-lg pb-1 px-2 py-1 rounded-md"
              rows={4}
              required
          />
                </div>
                {!initialData &&(
                    <div className="flex flex-wrap justify-end mt-5">
                        <div className="">
                            <button
                                type="submit"
                                disabled={title.length === 0 || body.length === 0}
                                className={`text-white px-4 py-2 shadow-sm focus:outline-none font-bold bg-primary rounded-lg ${
                                    title.length === 0 || body.length === 0
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                }`}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                ) }
            </div>
        </form>
    );
};

export default Form;
