import Link from 'next/link';
import Form from "~/components/home-page/form";
import React  from "react";

const TweetBox: React.FC = () => {
    return (
        <div>
            <div className="px-3 pt-5 pb-2 flex flex-wrap">
                <Link href="/personal">
                    <a className="flex-shrink-0 h-12 w-12">
                        <div className="relative">
                            <div
                                className="absolute anim left-0 right-0 top-0 bottom-0 z-10 hover:bg-black rounded-full hover:bg-opacity-15"></div>
                            <img
                                src="/images/personal.jpg"
                                alt="personal"
                                className="rounded-full min-w-full asd h-12 w-12"
                            />
                        </div>
                    </a>
                </Link>
                <Form />
            </div>
            <div className="h-2 bg-gray-100 w-full bg-opacity-15"></div>
        </div>
    );
};

export default TweetBox;
