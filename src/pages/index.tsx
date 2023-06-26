import {wrapper} from '@/store/store';
import {useAppDispatch, useAppSelector} from '@/hooks/reduxHook';
import {decrement, increment} from '@/store/reducer/counterSlice';
import {selectAuthState, setAuthState} from '@/store/reducer/authSlice';
import {selectUserState, setUserState} from "@/store/reducer/userSlice";
import {NextPage} from 'next';
import {useRef} from "react";

const Home = function () {
    const {value: count} = useAppSelector((state) => state.counter);
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuthState);
    const userState = useAppSelector(selectUserState);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onClickLoginBtn = () => {
        // @ts-ignore
        const email = emailRef.current.value;
        // @ts-ignore
        const password = passwordRef.current.value;
        if (email === '' || password === '') {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }
        // 사용자 정보를 가져온다.
        dispatch(setUserState({
            id: 1,
            name: '홍길동',
            email: email,
            password: password
        }));
        // 로그인을 하고, 로그인 성공시, 로그인 상태를 변경한다.
        dispatch(setAuthState(true));
        authState ? dispatch(setAuthState(false)) : dispatch(setAuthState(true));
    }

    return (
        <div className="ml-2">
            <div className="bg-white border-gray-200 dark:bg-gray-900">
                <div>home</div>
            </div>

            <div>{authState ? userState.name +'Logged in' : 'Not Logged In'}</div>

            <div className={authState ? "w-52 hidden " : "w-52 "}>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" placeholder="name@company.com"
                               ref={emailRef}
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                               ref={passwordRef}
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </form>
            </div>

            <div className="m-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onClickLoginBtn}
                >
                    {authState ? 'Logout' : 'LogIn'}
                </button>
            </div>
            {/*<div className="m-2">*/}
            {/*    <span>{count}</span>*/}

            {/*</div>*/}
            {/*<div className="flex">*/}
            {/*    <div className="m-2">*/}
            {/*        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(increment())}>increment</button>*/}
            {/*    </div>*/}
            {/*    <div className="m-2">*/}
            {/*        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(decrement())}>decrement</button>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({params}) => {
            // 초기 상태를 설정할 수 있고, 커스텀 로직을 추가할 수 있다.
            // 서버 단에서 Redux 액션을 수행할 수 있다.
            store.dispatch(increment());
            store.dispatch(setAuthState(false));
            console.log('State on server', store.getState());
            return {
                props: {}
            };
        }
);

export default Home;