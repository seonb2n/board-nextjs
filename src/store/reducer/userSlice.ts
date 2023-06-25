import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {RootState} from "@/store/store";

export interface UserState {
    name: string;
    email: string;
    password: string;
}

const initialState: UserState = {
    name: '',
    email: '',
    password: ''
}

export const UserSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state
                // ...action.payload.auth
            };
        }
    }
})

export const {setUser} = UserSlice.actions;
export const selectUserState = (state: RootState) => state.auth.authState;
export default UserSlice.reducer;