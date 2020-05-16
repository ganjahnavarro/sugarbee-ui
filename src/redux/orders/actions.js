import { createAction } from "redux-actions";

const fetchOrders = createAction("FETCH_ORDERS");
const fetchOrder = createAction("FETCH_ORDER");
const createOrder = createAction("SAVE_ORDER");
const editOrder = createAction("EDIT_ORDER");

export const getOrders = () => {
    return fetchOrders({
        request: {
            url: "/orders",
            method: "GET"
        }
    });
};

export const getOrdersByDate = (date) => {
    return fetchOrders({
        request: {
            params: {
                createdDate: date,
            },
            url: "/orders",
            method: "GET"
        }
    });
};

export const getOrderById = (identifier) => {
    return fetchOrder({
        request: {
            url: `/orders/${identifier}`,
            method: "GET",
        }
    });
};

export const saveOrder = (data) => {
    return createOrder({
        request: {
            url: "/orders",
            method: "POST",
            data
        }
    })
};

export const editOrderByIndex = (index) => {
    return editOrder({
        currentEditIndex: index,
    });
}
