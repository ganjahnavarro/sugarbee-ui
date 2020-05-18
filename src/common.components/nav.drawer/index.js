import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { NavContainer, LogoImage, Title, LogoutButton, NavDrawer, ExitNavButton } from "./components";

const NavigationDrawer = (props) => {
    return (
        <NavDrawer sidebar={<SideBarContent onExitNav={props.onExitNav} onLogout={props.onLogout} />}
            open={props.visible}
            screenHeight={document.documentElement.clientHeight}>
            {props.children}
        </NavDrawer>
    )
};

const SideBarContent = ({ onLogout, onExitNav }) => {
    return (
        <NavContainer>
            <LogoImage src={require("../../logo.jpg")} alt="App Logo" />
            <Title>Sugarbee Ordering App</Title>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
            <ExitNavButton onClick={onExitNav}>
                <i className="fa fa-times exit-nav-icon"></i>
            </ExitNavButton>
        </NavContainer>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLogout: (data) => {
            dispatch({ type: "LOGOUT" });
            dispatch(push("/"));
        }
    };
};

export default connect(null, mapDispatchToProps)(NavigationDrawer);
