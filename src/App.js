// src/App.js

import React from "react";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import {BrowserRouter, Route, Switch} from "react-router-dom";
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
import Registration from "./components/Registration";
import Home from "./components/Home";

counterpart.registerTranslations('es', es);
counterpart.registerTranslations('en', en);

var locale = localStorage.getItem('locale') === null ? 'es-AR' : localStorage.getItem('locale');
var lang = localStorage.getItem('lang') === null ? 'es' : localStorage.getItem('lang');
var currency = localStorage.getItem('currency') === null ? 'ARS' : localStorage.getItem('currency');
localStorage.setItem('lang', lang);
localStorage.setItem('locale', locale);
localStorage.setItem('currency', currency);
counterpart.setLocale(lang);

function App() {

    const { loading, user, isAuthenticated } = useAuth0();

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
                    {isAuthenticated && <Registration loggedUser={user}/>}
                </header>
                <Switch>
                    <Route path="/" exact />
                    {/*<PrivateRoute path="/registration" component={() => <Registration loggedUser={user}/>} />*/}
                    <PrivateRoute path="/home" component={() => <Home loggedUser={user}/>} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute path="/map" component={Map} />
                    <PrivateRoute path="/users" component={Users} />
                    {/* TODO: USERS ES TEMPORAL */}
                    <PrivateRoute path="/clientAccount" component={() => <ClientAccount loggedUser={user} />} />
                    {/*<PrivateRoute path="/providers" component={Providers} />*/}
                    <PrivateRoute path="/providers" component={() => <Providers loggedUser={user} />} />
                    {/*<PrivateRoute path="/beAProvider" component={() => <BecomeAProvider loggedUser={user} />} />*/}
                    <PrivateRoute path="/menus" component={() => <Menus loggedUser={user} />} />
                    <PrivateRoute path="/providerMenus/:provId/:clientId" exact strict component={ProviderMenus} />
                    <PrivateRoute path="/purchaseHistory" component={() => <PurchaseHistory loggedUser={user} />} />
                </Switch>

                {/*<footer style={*/}
                {/*    {fontSize: 'small',*/}
                {/*    padding: 4,*/}
                {/*    position: 'fixed',*/}
                {/*    left: 0,*/}
                {/*    bottom: 0,*/}
                {/*    width: '100%',*/}
                {/*    backgroundColor: '#f8f9fa',*/}
                {/*    textAlign: 'right'}*/}
                {/*}>*/}
                {/*    <Link to='/beAProvider'>*/}
                {/*        <Translate content='buttons.beAProvider'/>*/}
                {/*    </Link>*/}
                {/*</footer>*/}
            </BrowserRouter>
        </div>
    );
}

export default App;