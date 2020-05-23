import React from "react";
import { CustomerName, OrderItem, Orders, ContactNum, Price } from "./components";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { products } from "../../utils/values.products";
import { editOrderByIndex } from "../../redux/orders/actions";

const OrderView = (props) => {
    return (
        <div>
            {props.orders
                .sort((a, b) => a.customerName.localeCompare(b.customerName))
                .map((order, index) => {

                    let totalPrice = 0;
                    const orderDetailsComponent = order.orders.map(item => {
                        totalPrice += (item.price * item.quantity);
                        const productName = getProductName(item.productId);
                        return <Orders key={item.productId}>{item.quantity} x {productName}</Orders>;
                    });

                    // Format with comman and decimal places
                    totalPrice = totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

                    return <OrderItem
                        key={order.id}
                        wrap multipleLine align="top"
                        style={{ background: (index % 2) ? "none" : "#FCF3CF" }}
                        onClick={() => props.editOrder(index)}>
                            <CustomerName>{order.customerName}</CustomerName>
                            <ContactNum>{order.contactNumber}</ContactNum>
                            {orderDetailsComponent}
                            <Price>PHP {totalPrice}</Price>
                    </OrderItem>
                })
            }
        </div>
    )
};

const getProductName = (productId) => {
    let productName;
    products.forEach((product) => {
        product.items.forEach((item) => {
            if (item.id === productId) {
                productName = item.name;
            }
        });
    })
    return productName;
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        editOrder: (index) => {
            dispatch(editOrderByIndex(index))
            push("/editorder");
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderView);
