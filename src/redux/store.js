import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, compose } from "redux";

import { routerMiddleware } from 'connected-react-router';
import axiosMiddleware from "redux-axios-middleware";
import logger from 'redux-logger';

import createRootReducer from "./reducers";
import client from "../utils/axios";

export const history = createBrowserHistory();

const composeEnhancers =
    typeof window === "object" &&
        // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        routerMiddleware(history),
        axiosMiddleware(client),
        logger
    ),
    // other store enhancers if any
);

export default function configureStore() {
    const store = createStore(
        createRootReducer(history),
        enhancer
    );
    return store;
};
