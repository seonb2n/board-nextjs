// pages/_app.tsx
import {wrapper} from '@/store/store';
import {Provider} from 'react-redux';
import {AppProps} from "next/app";
import "@/app/globals.css";

function MyApp({Component, pageProps}: AppProps) {
    const {store, props} = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    );
}

export default MyApp;