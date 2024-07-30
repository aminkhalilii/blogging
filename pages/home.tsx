import React, {useRef, useEffect, useContext} from "react";
import {QueryClient} from "react-query";
import {dehydrate} from "react-query/hydration";
import {usePosts} from "~/services/posts";
import CenterContent from "~/components/shared/center-content";
import HomeCenterComponent from "~/components/home-page/home-center-component";
import {INextPage} from "~/types/INextPage";
import {Context} from "~/context/context";
import {ContextType} from "~/types/static";

const POST_COUNT = 1
const Home: INextPage = () => {
    const { setAllPosts,postCount,setPostCount } = useContext(Context) as ContextType;
    const {data, isFetching} = usePosts({
        variables: {page: postCount},
    });
    const ref = useRef<HTMLDivElement | null>(null);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isFetching) {
            setPostCount((prevCount) => prevCount + 1);
        }
    };

    useEffect(() => {
        if (data) {
            setAllPosts((prevPosts) => [...prevPosts, ...data]);
        }
    }, [data]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };
        const observer = new IntersectionObserver(handleIntersection, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };

    }, [isFetching]);

    return (
        <main>
            <CenterContent>
                <HomeCenterComponent childRef={ref}/>
            </CenterContent>
        </main>
    );
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
        usePosts.getKey({page: POST_COUNT}),
        usePosts.queryFn
    );
    console.log(queryClient)
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60,
    };
}

export default Home;




