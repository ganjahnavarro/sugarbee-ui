import React, { useState } from "react";
import { Button } from "antd-mobile";
import { Select, InputNumber } from "antd";
import { products } from "../../utils/values.products";
import { ProductContainer, ProductList, AddProductDiv, SubmitContainer } from "./../common/orderComponents";

import EditOrderModal from "./EditOrderModal";

const InputProduct = ({ productOptions, orders, onAddProduct, onEditOrders, onSaveEditedOrders }) => {
    const [selectedItemId, setSelectedItemId] = useState(1);
    const [itemQuantity, setItemQuantity] = useState(1);

    const [visible, setVisible] = useState(false);
    const closeModal = () => setVisible(false);

    const renderTotalComponent = (total) => (
        <div className="product-total" key={"total"}>
            <p className="total-label">Total</p>
            <p className="total">{total}</p>
        </div>
    );

    const ProductListItems = ({ orders }) => {
        const component = orders.length > 0 ? orders.map((order, index) => (
            <div className="product-item" key={`${order.name}-${index}`}>
                <p className="name">{order.quantity} x {order.name}</p>
                <p className="price">{order.price * (order.quantity || 1)}</p>
            </div>
        )) : null;

        if (component) {
            const total = orders.reduce((accu, order) => {
                return accu + order.price * (order.quantity || 1);
            }, 0);
            component.push(renderTotalComponent(total));
        }
        return component;
    };

    const actualProductsFromMapping = [];
    products.forEach((product) => {
        product.items.forEach((item) => {
            actualProductsFromMapping.push({
                id: item.id,
                name: item.name,
                price: item.price,
            })
        })
    })

    const selectedItem = actualProductsFromMapping.find((product) => product.id === selectedItemId);
    const onAddProductToOrders = () => {
        onAddProduct({
            productId: selectedItem.id,
            name: selectedItem.name,
            price: selectedItem.price,
            quantity: itemQuantity,
        });
        setSelectedItemId(1);
        setItemQuantity(1);
    };

    return (
        <ProductContainer>
            <div className="header">
                <p>Orders</p>
                <Button type="ghost" size="small" onClick={() => setVisible(true)} inline>Edit</Button>
                <EditOrderModal
                    visible={visible}
                    closeModal={closeModal}
                    onEditOrders={onEditOrders}
                    onSaveEditedOrders={onSaveEditedOrders}
                    orders={orders}  />
            </div>

            <ProductList>
                <ProductListItems orders={orders} />
            </ProductList>

            <AddProductDiv>
                <Select className="product-dropdown" value={selectedItem.name} onChange={(value) => setSelectedItemId(value)}>
                    {productOptions}
                </Select>
                <InputNumber className="product-quantity" min={1} value={itemQuantity} onChange={(value) => setItemQuantity(value)}/>
            </AddProductDiv>

            <SubmitContainer>
                <Button type="primary" size="small" onClick={onAddProductToOrders} inline>Add</Button>
            </SubmitContainer>
        </ProductContainer>
    );
};

export default InputProduct;
