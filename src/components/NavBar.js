// src/components/NavBar.js

import React, { useState } from 'react';
import {useAuth0} from "../react-auth0-spa";
// import {Link} from "react-router-dom";
import {
    Button, Collapse, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand, NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import Translate from 'react-translate-component';
import Language from '../lang/Language'

const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarToggler onClick={toggle} />

                <NavbarBrand href="/">
                    Viandas Ya
                </NavbarBrand>
                <Collapse isOpen={isOpen} navbar>

                {!isAuthenticated && (
                    <Nav className="ml-auto" navbar>
                        <Button color="info" onClick={() => loginWithRedirect({})}>
                            <Translate content='buttons.loginButton'/>
                        </Button>
                    </Nav>
                )}

                {isAuthenticated && (
                    <Nav className="ml-auto" navbar>
                        {/*<span>*/}
                        {/*    <Link to="/">Home</Link>&nbsp;*/}
                        {/*    <Link to="/profile">Profile</Link>*/}
                        {/*</span>*/}
                        <NavItem>
                            <NavLink href="/map">
                                <Translate content='map'/>
                            </NavLink>
                        </NavItem>
                        {/*<NavItem>*/}
                        {/*    <NavLink href="/users">Usuarios</NavLink>*/}
                        {/*</NavItem>*/}
                        <NavItem>
                            <NavLink href="/providers">
                                <Translate content="buttons.navbarProviderButton"/>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                             <NavLink href="/menus">
                                <Translate content='searchMenu'/>
                             </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/purchaseHistory">
                               <Translate content='purchaseHistory'/>
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <Translate content='account'/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                {/*<DropdownItem href="/providerAccount">Proveedor</DropdownItem>*/}
                                <DropdownItem href="/clientAccount">
                                    <Translate content='myAccount'/>
                                </DropdownItem>
                                {/* TODO:AGREGAR EL ID PARA IDENTIFICAR AL USUARIO LOGGEADO */}
                                {/*<DropdownItem divider />*/}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>

                )}

                {isAuthenticated &&
                <Nav className="ml-auto" navbar>
                    <Language />
                    <Button color="danger" onClick={() => logout()}>
                        <Translate content='buttons.logoutButton'/>
                    </Button>
                </Nav>
                }
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;