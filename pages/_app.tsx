import React, {useState} from "react";
import {
	Hydrate,
	QueryClient,
	QueryClientProvider
} from "@tanstack/react-query";
import '~/css/tailwind.css';
import '~/css/main.css';
import Provider from "~/context/context";
import Layout from "~/components/layout";
interface MyAppProps {
	Component: React.ComponentType<any>;
	pageProps: any;
	hideLayout?: boolean
}
const MyApp: React.FC<MyAppProps> = ({ Component, pageProps ,hideLayout}) => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<Provider>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Layout hideLayout={hideLayout}>
					<Component {...pageProps} />
					</Layout>
				</Hydrate>
			</QueryClientProvider>
		</Provider>
	);
};

export default MyApp;
