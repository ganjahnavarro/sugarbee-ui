import { handleActions } from "redux-actions";

const initialState = {
    loginStatus: null,
    userId: null,
};

export default handleActions({
    LOGIN_SUCCESS: (state, action) => {
        const { userId } = action.payload.data;
        return { ...state, userId, loginStatus: "SUCCESS" }
    },
    LOGIN_FAIL: (state, action) => {
        return { ...state, loginStatus: "FAIL" }
    },
    LOGOUT: (state, action) => {
        return initialState;
    }
}, initialState);
