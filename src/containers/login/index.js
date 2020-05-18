import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Modal } from "antd-mobile";
import { Formik } from "formik";

import { CenteredContainer, LogoImage, TextInput, SubmitButton } from "./components";

import { login } from "../../redux/auth/actions";

const notification = Modal.alert;

const Login = ({ loginRequest, loginStatus, history }) => {
    const initialValues = { username: "", password: "" };

    useEffect(() => {
        if (loginStatus === "SUCCESS") {
            history.push("/ordering");
        } else if (loginStatus === "FAIL") {
            notification("Oops!", "The credentials you put in are incorrect.", [{ text: "OK" }]);
        }
    }, [loginStatus])

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true);
        loginRequest(values);
    };

    return (
        <CenteredContainer>
            <LogoImage src={require("../../logo.jpg")} alt="logo" />
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <TextInput value={props.values.username}
                            onChange={props.handleChange("username")}
                            name={"username"}
                            type={"text"}
                            placeholder={"Username"}
                            disabled={props.isSubmitting} />

                        <TextInput value={props.values.password}
                            onChange={props.handleChange("password")}
                            name={"password"}
                            type={"password"}
                            placeholder={"Password"}
                            disabled={props.isSubmitting}  />

                        <SubmitButton type={"submit"}
                            value={"Login"}
                            disabled={props.isSubmitting}  />
                    </form>
                )}
            </Formik>
        </CenteredContainer>
    );
}

const mapStateToProps = (state) => {
    const { loginStatus } = state.auth;
    return { loginStatus };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (data) => dispatch(login(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
