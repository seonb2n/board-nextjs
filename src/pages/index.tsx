import { wrapper } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { decrement, increment } from '@/store/reducer/counterSlice';
import { selectAuthState, setAuthState } from '@/store/reducer/authSlice';
import { NextPage } from 'next';

const Home = function () {
    const { value: count } = useAppSelector((state) => state.counter);
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuthState);

    return (
        <div className="ml-2">
            <div className="bg-white border-gray-200 dark:bg-gray-900">
                <div>home</div>
            </div>
            <div>REDUX</div>
            <div>{authState ? 'Logged in' : 'Not Logged In'}</div>
            <div className="m-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        authState
                            ? dispatch(setAuthState(false))
                            : dispatch(setAuthState(true));
                    }}
                >
                    {authState ? 'Logout' : 'LogIn'}
                </button>
            </div>
            <div className="m-2">
                <span>{count}</span>

            </div>
            <div className="flex">
                <div className="m-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(increment())}>increment</button>
                </div>
                <div className="m-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(decrement())}>decrement</button>
                </div>
            </div>

        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
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