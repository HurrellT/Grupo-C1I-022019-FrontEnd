// src/components/NavBar.js

import React from "react";
import {useAuth0} from "../react-auth0-spa";
import {Link} from "react-router-dom";
import {
    Button, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";

const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    return (
        <div>
            <Navbar color="light" light expand="md">

                <NavbarBrand href="/">
                    Viandas Ya
                </NavbarBrand>

                {!isAuthenticated && (
                    <Nav className="ml-auto" navbar>
                        <Button color="info" onClick={() => loginWithRedirect({})}>
                            Log in
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
                            <NavLink href="/map">Mapa</NavLink>
                        </NavItem>
                        {/*<NavItem>*/}
                        {/*    <NavLink href="/users">Usuarios</NavLink>*/}
                        {/*</NavItem>*/}
                        <NavItem>
                            <NavLink href="/providers">Proveedores</NavLink>
                        </NavItem>
                        <NavItem>
                             <NavLink href="/menus">Buscar Menú</NavLink>
                          </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Cuenta
                            </DropdownToggle>
                            <DropdownMenu right>
                                {/*<DropdownItem href="/providerAccount">Proveedor</DropdownItem>*/}
                                <DropdownItem href="/clientAccount">Mis datos</DropdownItem>
                                {/* TODO:AGREGAR EL ID PARA IDENTIFICAR AL USUARIO LOGGEADO */}
                                {/*<DropdownItem divider />*/}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>

                )}

                {isAuthenticated &&
                <Nav className="ml-auto" navbar>
                    <Button color="danger" onClick={() => logout()}>
                        Log out
                    </Button>
                </Nav>

                }
            </Navbar>
        </div>
    );
};

export default NavBar;