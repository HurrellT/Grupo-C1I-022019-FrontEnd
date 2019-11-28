// src/App.js

import React from "react";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Map from "./components/Map/Map";
import ClientAccount from "./components/Users/ClientAccount";
import './App.css';
import Users from "./components/Users/Users";
import Providers from "./components/Users/Providers";
import Menus from "./components/Menus/Menus";
import ProviderMenus from "./components/Menus/ProviderMenus";
import PurchaseHistory from "./components/Purchases/PurchaseHistory";
import counterpart from 'counterpart'
import es from "./lang/es";
import en from "./lang/en";
import Translate from 'react-translate-component';

counterpart.registerTranslations('es', es)
counterpart.registerTranslations('en', en)
counterpart.setLocale(localStorage.getItem('lang'))

function App() {
    const { loading } = useAuth0();

    const padding = {
        padding: 10
    }

    if (loading) {
        return (
            <div>
                <header>
                    <NavBar />
                </header>
                <Translate
                    content='loading'
                    style={padding}
                    component='h2'
                />
            </div>
        );
    }

    return (
        <div className="App">
            <BrowserRouter>
                <header>
                    <NavBar />
                </header>
                <Switch>
                    <Route path="/" exact />
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute path="/map" component={Map} />
                    <PrivateRoute path="/users" component={Users} />
                    {/* TODO: USERS ES TEMPORAL */}
                    <PrivateRoute path="/clientAccount" component={ClientAccount} />
                    <PrivateRoute path="/providers" component={Providers} />
                    <PrivateRoute path="/menus" component={Menus} />
                    <PrivateRoute path="/providerMenus/:provId" exact strict component={ProviderMenus} />
                    <PrivateRoute path="/purchaseHistory" component={PurchaseHistory} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;