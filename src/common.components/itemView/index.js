import React from "react";
import { connect } from "react-redux";
import { ItemList, OrderName } from "./components"

import { products } from "../../utils/values.products";
import { orderDetails } from "../../utils/dummy.array";


const ItemView = ({ orders }) => {
    const countsMap = new Map()
    orders.forEach(order => {
        order.orders.forEach(item => {
            const currentCount = countsMap.get(item.productId);
            countsMap.set(item.productId, currentCount ? currentCount + item.quantity : item.quantity);
        })
    });

    const itemsComponent = [];

    for (const [key, value] of countsMap.entries()) {
        const productName = getProductName(key);
        itemsComponent.push(
          <ItemList
              key={key}
              wrap multipleLine align="top"
              extra={value}>
              <OrderName>{productName}</OrderName>
          </ItemList>
        )
    }

    return <div>
        {itemsComponent}
    </div>;
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
    const { orders } = state.orders;
    return { orders };
};

export default connect(mapStateToProps)(ItemView);
