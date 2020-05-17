import React from "react";
import { Route } from "react-router-dom";

import Login from "./containers/login";
import NewOrder from "./containers/new.order";
import EditOrder from "./containers/edit.order";
import MainOrdering from "./containers/main.ordering";


function App () {
    return (
        <div className="app-container">
            <Route exact path="/" component={Login} />
            <Route path="/neworder" component={NewOrder} />
            <Route path="/ordering" component={MainOrdering} />
            <Route path="/editorder" component={EditOrder} />
        </div>
    );
}

export default App
