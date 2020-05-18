import { createAction } from "redux-actions";

const loginRequest = createAction("LOGIN");

export const login = (data) => {
    return loginRequest({
        request: {
            url: "/login",
            method: "POST",
            data
        }
    });
};
