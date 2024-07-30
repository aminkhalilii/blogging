import React, {useEffect} from "react";

interface ModalProps {
    onCancel: () => void;
    onSubmit: () => void;
    isOpen: boolean;
    children: React.ReactNode,
    submitButton: string,
    title: string,
    disable?: boolean
}

const Modal: React.FC<ModalProps> = ({onCancel, onSubmit, isOpen,children,submitButton,title,disable}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);
    return (
        <div
            className="flex justify-center items-center overflow-x-hidden bg-black bg-opacity-75 overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-2xl w-11/12">
                <div
                    className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div
                        className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <p className="text-2xl font=semibold mr-8">{title}</p>
                        <button
                            className="bg-transparent border-0 text-black float-right focus:outline-none"
                            onClick={onCancel}
                        >
                            <span>x</span>
                        </button>
                    </div>
                    {children && (
                        <div className="modal-content">{children}</div>
                    )}
                    <div
                        className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={onCancel}
                        >
                            Close
                        </button>
                        <button
                            className="text-white  bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={onSubmit}
                            disabled={disable}
                        >
                            {submitButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

