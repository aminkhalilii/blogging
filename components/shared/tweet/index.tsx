import Link from 'next/link';
import Replies from '~/svgs/replies.svg';
import Retweet from '~/svgs/retweet.svg';
import Heart from '~/svgs/heart.svg';
import Share from '~/svgs/share.svg';
import More from '~/svgs/more.svg';
import {useContext, useRef, useState} from "react";
import {Context} from "~/context/context";
import {ContextType} from "~/types/static";
import useClickOutside from "~/hooks/useClickOutside";

export interface ITweet {
	body: string,
	id: number,
	title:string,
	userId: number,
	handleShowModal: (type:string)=>void
}

const TweetComponent: React.FC<ITweet> = props => {
	const { setId,setPost } = useContext(Context) as ContextType;

	const [openSelect,setOpenSelect]=useState(false)

	const selectRef = useRef(null);

	useClickOutside(selectRef, () => {
		setOpenSelect(false);
	});

	const editAction = ()=>{
		if(openSelect){
			setOpenSelect(false)
		}
		props.handleShowModal('edit')
		setId(props.id)
		setPost(props)
	}

	const deleteAction = ()=>{
		if(openSelect){
			setOpenSelect(false)
		}
		props.handleShowModal('delete')
		setId(props.id)
	}

	return (
		<>
			<div className="flex cursor-pointer hover:bg-dark-lighter p-3 anim border-b border-gray-100 border-opacity-15">
				<Link href="/mhmdou1">
					<a className="flex-shrink-0 h-12 w-12 pt-1">
						<div className="relative">
							<div className="absolute anim left-0 right-0 top-0 bottom-0 z-10 hover:bg-black rounded-full hover:bg-opacity-15"></div>
						</div>
					</a>
				</Link>
				<div className="flex-grow px-3 pb-1 relative">
					<div className="flex justify-end">

						<div className="p-5">

							<div className="dropdown inline-block relative">
								<button onClick={()=>setOpenSelect(!openSelect)}
									className="text-white rounded-full anim px-1 py-1 hover:bg-primary hover:bg-opacity-15 focus:bg-opacity-50 focus:outline-none">
									<More height="1rem"  />
								</button>
								{openSelect && (
									<ul className="dropdown-menu absolute block text-gray-700 pt-1 right-0"  ref={selectRef}>
										<li onClick={editAction}><span
											className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Edit</span></li>
										<li onClick={deleteAction}><span
											className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block text-red-600 whitespace-no-wrap">Delete</span></li>
									</ul>
								)}
							</div>

						</div>
					</div>
					<div className="pr-1">
						<div className="mt-3 flex-wrap flex text-white text-2xl mb-5">{props.title}</div>

						<span
							className="text-white"
							dangerouslySetInnerHTML={{ __html: props.body || '' }}></span>
					</div>
					<div className="flex mt-3">
						<div className="text-gray-500 select-none hover:text-primary anim flex items-center flex-grow">
							<Replies height="1.2rem" />
						</div>
						<div className="text-gray-500 select-none hover:text-green-600 anim flex items-center flex-grow">
							<Retweet height="1.2rem" />
						</div>
						<div className="text-gray-500 select-none hover:text-pinkish anim flex items-center flex-grow">
							<Heart height="1.2rem" />
						</div>
						<div className="text-gray-500 select-none  hover:text-primary anim flex items-center flex-grow">
							<Share height="1.2rem" />
						</div>
					</div>
				</div>
			</div>

		</>

	);
};

export default TweetComponent;
