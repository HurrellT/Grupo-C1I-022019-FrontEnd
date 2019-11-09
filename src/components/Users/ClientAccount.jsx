import React from 'react'
import axios from 'axios'
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Alert} from 'reactstrap';
import Label from "reactstrap/es/Label";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";

class Users extends React.Component {

    constructor(props) {
        super(props)

        this.homeRoute = this.homeRoute.bind(this);

        this.state = {
            users: [],
            newUserData: {
                name: '',
                lastname: '',
                state: '',
                address: '',
                email: '',
                phone: '',
                accountCredit: 0.0,
            },
            editUserData: {
                id: '',
                name: '',
                lastname: '',
                state: '',
                address: '',
                email: '',
                phone: '',
                accountCredit: 0.0,
            },
            newUserModal: false,
            editUserModal: false,
            errorMessage: []
        }
    }

    //METHODS

    componentDidMount() {
        this._refreshUsers();
    }

    toggleNewUserModal() {
        this.setState({
            newUserModal: !this.state.newUserModal
        })
    }

    addClient() {
        axios.post('http://localhost:8080/client', this.state.newUserData)
            .then((response) => {
                //TODO: Get the alert render to work
                if (!response.ok) {
                    this.setState({errorMessage: response.data.errors})
                    console.log(response)
                } else {
                    let {users} = this.state;
                    users.push(response.data);
                    this.setState(
                        {
                            users,
                            newUserModal: false,
                            newUserData: {
                                name: '',
                                lastname: '',
                                state: '',
                                address: '',
                                email: '',
                                phone: '',
                                accountCredit: 0.0,
                            }
                        });
                    this._refreshUsers();
                }
            })
    }

    editUser(id, name, lastname, state, address, email, phone, accountCredit) {
        this.setState({
            editUserData: {id, name, lastname, state, address, email, phone, accountCredit},
            editUserModal: !this.state.editUserModal
        })
    }

    updateClient() {
        let {name, lastname, state, address, email, phone, accountCredit} = this.state.editUserData;

        axios.put('http://localhost:8080/client/' + this.state.editUserData.id, {
            name, lastname, state, address, email, phone, accountCredit
        })
            .then((response) => {
                this._refreshUsers();
                this.setState({
                    editUserModal: false,
                    editUserData: {
                        id: '',
                        name: '',
                        lastname: '',
                        state: '',
                        address: '',
                        email: '',
                        phone: '',
                        accountCredit: 0.0,
                    }
                })
            })
    }

    deleteUser(id) {
        axios.delete('http://localhost:8080/user/' + id)
            .then((response) => {
                this._refreshUsers();
            })
    }


    _refreshUsers() {
        //TODO: CHANGE THIS WITH THE HEROKU URL
        // axios.get('http://viandas-ya.herokuapp.com/users')
        axios.get('http://localhost:8080/users')
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retreiving data'})
            })
    }

    homeRoute() {
        let path = `/`;
        this.props.history.push(path);
    }

    //TODO: Depending on the user role (client, provider) you see the table with all
    //      users, or your profile (with the according fields for each role).
    //      The admin role sees a Users option.
    //      SEE HOW TO DETERMINE WHICH PAGE YOU SEE DEPENDING ON YOUR ROLE PERMISSION
    //      Maybe a flag userType in the json?

    //RENDER

    render() {
        const {users, errorMsg} = this.state

        return (
            <Container>

                <Row>
                    <Col xs={8}>
                        <h1 className="my-3">Mi Cuenta</h1>
                    </Col>
                </Row>
                <Form>
                    {/* NAME */}
                    <FormGroup row>
                        <Label for="name" sm={2}>Nombre</Label>
                        <Col sm={10}>
                            <Input name="name" id="name" placeholder="Escriba su primer nombre"
                                   value={this.state.editUserData.name}
                                //TODO: how to extract this correctly?
                                   onChange={(e) => {
                                       let {editUserData} = this.state;
                                       editUserData.name = e.target.value;
                                       this.setState({editUserData})
                                   }}/>
                        </Col>
                    </FormGroup>

                    {/* LASTNAME */}
                    <FormGroup row>
                        <Label for="lastname" sm={2}>Apellido</Label>
                        <Col sm={10}>
                            <Input name="lastname" id="lastname" placeholder="Escriba su apellido"
                                   value={this.state.editUserData.lastname}
                                   onChange={(e) => {
                                       let {editUserData} = this.state;
                                       editUserData.lastname = e.target.value;
                                       this.setState({editUserData})
                                   }}/>
                        </Col>
                    </FormGroup>

                    {/* STATE */}
                    <FormGroup row>
                        <Label for="state" sm={2}>Ciudad</Label>
                        <Col sm={10}>
                            <Input name="state" id="state" placeholder="Escriba su ciudad de residencia"
                                   value={this.state.editUserData.state}
                                   onChange={(e) => {
                                       let {editUserData} = this.state;
                                       editUserData.state = e.target.value;
                                       this.setState({editUserData})
                                   }}/>
                        </Col>
                    </FormGroup>

                    {/* ADDRESS */}
                    <FormGroup row>
                        <Label for="address" sm={2}>Dirección</Label>
                        <Col sm={10}>
                            <Input name="address" id="address" placeholder="Escriba su dirección"
                                   value={this.state.editUserData.address}
                                   onChange={(e) => {
                                       let {editUserData} = this.state;
                                       editUserData.address = e.target.value;
                                       this.setState({editUserData})
                                   }}/>
                        </Col>
                    </FormGroup>

                    {/* EMAIL */}
                    <FormGroup row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="email" placeholder="Escriba su email"
                                   value={this.state.editUserData.email}
                                   onChange={(e) => {
                                       let {editUserData} = this.state;
                                       editUserData.email = e.target.value;
                                       this.setState({editUserData})
                                   }}/>
                        </Col>
                    </FormGroup>

                    {/* PHONE */}
                    <FormGroup row>
                        <Label for="phone" sm={2}>Telefono</Label>
                        <Col sm={10}>
                            <Input name="phone" id="phone" placeholder="Escriba su telefono"
                                   value={this.state.editUserData.phone}
                                   onChange={(e) => {
                                       let {editUserData} = this.state;
                                       editUserData.phone = e.target.value;
                                       this.setState({editUserData})
                                   }}/>
                        </Col>
                    </FormGroup>

                    {/* ACCOUNT CREDIT */}
                    <FormGroup row>
                        <Label for="accountCredit" sm={2}>Credito</Label>
                        <Col sm={10}>
                            <Input name="accountCredit" id="accountCredit" placeholder="Credito"
                                   value={this.state.editUserData.accountCredit}
                                   onChange={(e) => {
                                       let {editUserData} = this.state;
                                       editUserData.accountCredit = e.target.value;
                                       this.setState({editUserData})
                                   }}/>
                        </Col>
                    </FormGroup>

                </Form>

                <Row>
                    <Button color="primary" onClick={this.updateClient.bind(this)}>
                        Editar Usuario
                    </Button>{' '}
                    <Button color="secondary" onClick={this.homeRoute.bind(this)}>
                        Cancelar
                    </Button>
                </Row>

            </Container>
        )
    }

}

export default Users