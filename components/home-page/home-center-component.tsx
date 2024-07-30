import dynamic from 'next/dynamic';
import ReactList from 'react-list';
import React, {useCallback, useContext, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {Context} from "~/context/context";
import {ContextType} from "~/types/static";
import Form from "~/components/home-page/form";
import TweetComponent from "~/components/shared/tweet";
import TweetBox from "~/components/home-page/tweet-box";

const Modal = dynamic(() => import('~/components/shared/modal/modal'), {ssr: false})

interface HomeCenterComponentProps {
    childRef: React.RefObject<HTMLDivElement>;
}

const HomeCenterComponent: React.FC<HomeCenterComponentProps> = ({childRef}) => {
    const {
        setAllPosts,
        allPosts,
        postCount,
        id,
        showModal,
        setShowModal,
        setData,
        data,
        post
    } = useContext(Context) as ContextType;
    const [modalType, setModalType] = useState<string | null>(null);

    const handleShowModal = useCallback((type: string) => {
        setModalType(type);
        setShowModal(!showModal);
    }, [showModal]);


    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);


    const deleteMutation = useMutation(
        async () => {
            try {
                const response = await axios.delete(
                    `https://jsonplaceholder.typicode.com/posts/${id}`
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        {
            onMutate() {
                // You can perform actions before the mutation starts, such as showing a loading indicator.
                // This is a good place to update your UI to indicate that the delete operation is in progress.
                // You can return a value that will be passed to onSettled if needed.
            },
            onSuccess(data) {
                console.log("Successful deletion", {data});
                setShowModal(false);
            },
            onError(error) {
                console.log("Failed to delete", {error});
                setShowModal(false);
            },
            onSettled() {
                setAllPosts((prev) => prev.filter(post => post.id !== id))
                console.log("Mutation completed.");
                setShowModal(false);
            },
        }
    );

    async function handleSubmit() {
        await deleteMutation.mutateAsync();
    }

    const editMutation = useMutation(
        async () => {
            // eslint-disable-next-line no-useless-catch
            try {
                const response = await axios.patch(
                    `https://jsonplaceholder.typicode.com/posts/${id}`,
                    {
                        title: data.title,
                        body: data.body,
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
                setData({
                    title: "",
                    body: "",
                })
                setShowModal(false);

            },
            onError(error) {
                console.log("Failed", {error});
                setShowModal(false);

            },
            onSettled(res) {
                setAllPosts((prev) => {
                   const newPosts = [...prev]
					const post = newPosts.find(post => post.id === id)
                    if(post){
                        post.title = res.title
                        post.body = res.body
                    }
					return newPosts
                })
                console.log("Mutation completed.");
                setData({
                    title: "",
                    body: "",
                })
                setShowModal(false);
            },
        }
    );


    async function handleEditSubmit() {
        await editMutation.mutateAsync()
    }

    return (
        <div>
            <div className="p-3 border-b border-white border-opacity-15 sticky top-0 bg-dark z-50">
                <span className="text-white text-xl font-extrabold">Home</span>
            </div>
            <TweetBox/>
            <div>
                <ReactList
                    type="variable"
                    axis="y"
                    length={allPosts.length}
                    itemRenderer={(idx, key) => <TweetComponent key={key}
                                                                handleShowModal={handleShowModal}  {...allPosts[idx]} />}
                />
            </div>
            {postCount !== 10 && (
                <div ref={childRef}></div>
            )}
            {showModal && (
                <Modal
                    onCancel={handleCloseModal}
                    onSubmit={modalType === "delete" ? handleSubmit : handleEditSubmit}
                    isOpen={showModal}
                    submitButton={modalType === "delete" ? "DELETE" : "EDIT"}
                    title={modalType === "delete" ? "Do you sure delete this post?" : "Edit this post"}
                    children={modalType === 'edit' ? <Form initialData={post}/> : null}
                    disable={modalType === "delete" ? false : data.title.length === 0}
                />
            )}
        </div>
    );
};

export default HomeCenterComponent;
