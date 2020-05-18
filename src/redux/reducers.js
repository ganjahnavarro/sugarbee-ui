import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';

import auth from "./auth/reducer"
import orders from "./orders/reducer"

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth,
    orders
})
export default createRootReducer;
