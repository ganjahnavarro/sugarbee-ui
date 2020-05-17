import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';

import orders from "./orders/reducer"

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    orders
})
export default createRootReducer;
