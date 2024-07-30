import { createQuery } from "react-query-kit";
import axios from "axios";
import {IPosts} from "~/types/static";

export const usePosts = createQuery<
    IPosts[],
    { page: number }
>({
    primaryKey: "https://jsonplaceholder.typicode.com/posts",
    queryFn: async ({ queryKey: [url, variables] }) => {
        const { page } = variables;
        const limit =  10;

        try {
            const response = await axios.get(`${url}?_page=${page}&_limit=${limit}`);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching data: " + error.message);
        }

    }
});
