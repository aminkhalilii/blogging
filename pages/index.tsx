import { INextPage } from '../types/INextPage';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';

const IndexPage: INextPage = () => {
	const router = useRouter();
	useEffect(() => {
		router.replace('/home');
	}, []);
	return null;
};

export async function getServerSideProps(ctx: NextPageContext) {
	try {
		ctx.res?.writeHead(302, { Location: '/home' });
		ctx.res?.end();
		return {
			props: {},
		};
	} catch (error) {
		console.log(error);
	}
}
export default IndexPage;
