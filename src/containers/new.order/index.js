import React, { useEffect } from "react";
import { connect } from "react-redux";
import { InputItem, Modal, Icon, DatePicker, List, Picker } from "antd-mobile";
import { Formik } from "formik";
import { Select } from 'antd';
import { Container, NavigationBar, NavLink, LayoutContainer, Label, LabelPicker,
    RadioContainer, RadioList, PaymentOptionCont, DiscountAmount, SubmitButton } from "./../common/orderComponents";
import InputProduct from "./AddOrderComponent";
import { deliveryMethods, storeLocations, paymentOptions, paymentStatusData, discountData } from "../../utils/values.dropdown";
import { products } from "../../utils/values.products";
import { newOrderForm as initialFormValues } from "../../utils/values.initial";
import enUs from "antd-mobile/lib/date-picker/locale/en_US";

import { saveOrder } from "../../redux/orders/actions";

const { Option, OptGroup } = Select;
const notification = Modal.alert;

const NewOrder = ({ history, createOrder, saveOrderStatus }) => {
    const productOptions = products.map((product) => {
        return <OptGroup label={product.name} key={product.name}>
            {product.items.map((subItem) => (
                <Option key={subItem.name} value={subItem.name.replace(/ /g,"_")}>
                    {subItem.name}
                </Option>
            ))}
        </OptGroup>
    });

    useEffect(() => {
        if (saveOrderStatus === "SUCCESS") {
            notification("Nice!", "An order has been saved.", [{ text: "OK", onPress: () => history.push("/ordering") }]);
        } else if (saveOrderStatus === "FAIL") {
            notification("Oops!", "An error has occurred, please try again.", [{ text: "OK" }]);
        }
    }, [saveOrderStatus])

    const handleSubmit = async (data, actions) => {
        actions.setSubmitting(true);
        createOrder(
            Object.assign({}, data, {
                deliveryMethod: data.deliveryMethod[0],
                pickupLocation: data.pickupLocation[0],
                paymentOption: data.paymentOption[0]
            })
        );
    };

    return (
        <Container>
            <NavigationBar icon={<Icon type="left" />}
              leftContent={[<NavLink to="/ordering">Back</NavLink>]}>
            </NavigationBar>
            <Formik onSubmit={handleSubmit} initialValues={initialFormValues}>
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <LayoutContainer>
                            <InputItem name="customerName"
                                value={props.values.customerName}
                                placeholder="e.g. Juan Dela Cruz"
                                onChange={props.handleChange("customerName")}
                                children="Name:" />

                            <InputItem name="contactNumber"
                                value={props.values.contactNumber}
                                type="number"
                                placeholder="09XX XXX XXXX"
                                onChange={props.handleChange("contactNumber")}
                                children="Contact #:" />

                            <InputItem name="email"
                                value={props.values.email}
                                type="email"
                                placeholder="e.g. juandelacruz@thecompany.ph"
                                onChange={props.handleChange("email")}
                                children="Email:" />

                            <InputItem name="facebook"
                                value={props.values.facebook}
                                placeholder="e.g. https://fb.com/juandelacruz"
                                onChange={props.handleChange("facebook")}
                                children="Facebook:" />

                            <InputItem name="instagram"
                                value={props.values.instagram}
                                placeholder="e.g. _juandelacruz"
                                onChange={props.handleChange("instagram")}
                                children="Instagram:" />

                            <InputItem name="deliveryAddress"
                                value={props.values.deliveryAddress}
                                placeholder="e.g. 8757 Paseo de Roxas"
                                onChange={props.handleChange("deliveryAddress")}
                                children="Address:" />

                            <InputItem name="request"
                                value={props.values.request}
                                placeholder="e.g. Happy Birthday Note"
                                onChange={props.handleChange("request")}
                                children="Request:" />

                            <InputItem name="specialOffer"
                                value={props.values.specialOffer}
                                placeholder="e.g. Free brownies"
                                onChange={props.handleChange("specialOffer")}
                                children="Special Offer:" />

                            <InputProduct productOptions={productOptions}
                                orders={props.values.orders}
                                onEditOrders={(orders) => props.setFieldValue("orders", orders)}
                                onAddProduct={(value) => props.setFieldValue("orders", [...props.values.orders, value])}/>

                            <DatePicker name="dateOrdered"
                                mode="date"
                                title="Select Date"
                                extra="Optional"
                                locale={enUs}
                                value={props.values.dateOrdered}
                                onChange={e => props.setFieldValue("dateOrdered", e)}>
                                    <List.Item arrow="horizontal">
                                        <LabelPicker>Date Ordered</LabelPicker>
                                    </List.Item>
                            </DatePicker>

                            <DatePicker name="pickupDate"
                                mode="date"
                                title="Select Date"
                                extra="Optional"
                                locale={enUs}
                                value={props.values.pickupDate}
                                onChange={e => props.setFieldValue("pickupDate", e)}>
                                    <List.Item arrow="horizontal">
                                        <LabelPicker>Pickup Date</LabelPicker>
                                    </List.Item>
                            </DatePicker>

                            <Picker name="deliveryMethod"
                                data={deliveryMethods}
                                cols={1}
                                locale={enUs}
                                okText="OK"
                                dismissText="CANCEL"
                                value={props.values.deliveryMethod}
                                onChange={e => props.setFieldValue("deliveryMethod", e)}>
                                    <List.Item arrow="horizontal">
                                        <LabelPicker>Delivery Method</LabelPicker>
                                    </List.Item>
                            </Picker>

                            <Picker name="pickupLocation"
                                data={storeLocations}
                                cols={1}
                                className="forss"
                                locale={enUs}
                                okText="OK"
                                dismissText="CANCEL"
                                value={props.values.pickupLocation}
                                onChange={e => props.setFieldValue("pickupLocation", e)}>
                                    <List.Item arrow="horizontal">
                                        <LabelPicker>Pickup Location</LabelPicker>
                                    </List.Item>
                            </Picker>

                            <Label>Payment Status</Label>
                            <RadioContainer>
                                {paymentStatusData.map(i => (
                                    <RadioList
                                        name="paymentStatus"
                                        key={i.value}
                                        checked={props.values.paymentStatus === i.value}
                                        onChange={() => props.setFieldValue("paymentStatus", i.value)}>
                                            {i.label}
                                    </RadioList>
                                ))}

                                <PaymentOptionCont paymentStatus={props.values.paymentStatus}>
                                    <Picker name="paymentOption"
                                        data={paymentOptions}
                                        cols={1}
                                        className="forss"
                                        locale={enUs}
                                        okText="OK"
                                        dismissText="CANCEL"
                                        value={props.values.paymentOption}
                                        onChange={e => props.setFieldValue("paymentOption", e)}>
                                            <List.Item arrow="horizontal"></List.Item>
                                    </Picker>
                                </PaymentOptionCont>
                            </RadioContainer>

                            <Label>Discount</Label>
                            <RadioContainer>
                                {discountData.map(i => (
                                    <RadioList
                                        name="discountType"
                                        key={i.value}
                                        checked={props.values.discountType === i.value}
                                        onChange={() => props.setFieldValue("discountType", i.value)}>
                                            {i.label}
                                    </RadioList>
                                ))}

                                <DiscountAmount name="discountAmount"
                                    value={props.values.discountAmount}
                                    placeholder="e.g. 100"
                                    onChange={props.handleChange("discountAmount")} />
                            </RadioContainer>
                            <SubmitButton type={"submit"}
                                value={"Create Order"}
                                disabled={props.isSubmitting}  />
                        </LayoutContainer>
                    </form>
                )}
            </Formik>
        </Container>
    )
};

const mapStateToProps = (state) => {
    const { saveOrderStatus } = state.orders;
    return { saveOrderStatus };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: (dateToFetch) => dispatch(saveOrder(dateToFetch))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
