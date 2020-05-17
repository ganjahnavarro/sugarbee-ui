import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { LayoutContainer, ViewButton, FloatingAddButton } from "./components";

const defaultValues = ["Item View", "Order View"];

const Footer = (props) => {
    return (
        <LayoutContainer size="lg" className="sc-example">
            <ViewButton values={defaultValues}
                onChange={props.onSelectedViewChanged}
                tintColor= "#F1C40F" />
            <FloatingAddButton>
                <a onClick={props.addOrder}>
                    <i className="fa fa-plus add-order-icon"></i>
                </a>
            </FloatingAddButton>
        </LayoutContainer>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        addOrder: () => {
            dispatch({ type: "ADD_ORDER" });
            dispatch(push("/neworder"));
        }
    };
};

export default connect(null, mapDispatchToProps)(Footer);
