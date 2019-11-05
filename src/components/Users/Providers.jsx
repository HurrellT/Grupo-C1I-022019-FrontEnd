import React from 'react'
import axios from 'axios'
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Alert} from 'reactstrap';
import Label from "reactstrap/es/Label";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";

function ModalAlert({ errorsToShow }) {
    const hasErrorsToShow = errorsToShow.length > 0

    if (hasErrorsToShow) {
        return (
            <Alert color="danger">
                {errorsToShow.map(error => <div>{error}</div>)}
            </Alert>
        )
    }
    return <div />
}

class Providers extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            newUserData: {
                name: '',
                state: '',
                address: '',
                email: '',
                phone: '',
                accountCredit: 0.0,
                logo: '',
                latitude: '',
                longitude: '',
                description: '',
                website: '',
                officeHoursFrom: '',
                offideHoursTo: '',
                offideDaysFrom: '',
                offideDaysTo: '',
                menus: []
            },
            editUserData: {
                name: '',
                state: '',
                address: '',
                email: '',
                phone: '',
                accountCredit: 0.0,
                logo: '',
                latitude: '',
                longitude: '',
                description: '',
                website: '',
                officeHoursFrom: '',
                offideHoursTo: '',
                offideDaysFrom: '',
                offideDaysTo: '',
                menus: []
            },
            newUserModal: false,
            editUserModal: false,
            errorMessages: []
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

    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        })
    }

    addClient() {
        axios.post('http://localhost:8080/client', this.state.newUserData)
            .then((response) => {
                //TODO: Get the alert render to work
                let {users} = this.state;
                users.push(response.data);
                this.setState(
                    {
                        users,
                        newUserModal: false,
                        newUserData: {
                            name: '',
                            state: '',
                            address: '',
                            email: '',
                            phone: '',
                            accountCredit: 0.0,
                            logo: '',
                            latitude: '',
                            longitude: '',
                            description: '',
                            website: '',
                            officeHoursFrom: '',
                            offideHoursTo: '',
                            offideDaysFrom: '',
                            offideDaysTo: '',
                            menus: []
                        }
                    });
                this._refreshUsers();
            })
            .catch((error) => {
                this.setState({
                    errorMessages: error.response.data.errors
                })
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
                        name: '',
                        state: '',
                        address: '',
                        email: '',
                        phone: '',
                        accountCredit: 0.0,
                        logo: '',
                        latitude: '',
                        longitude: '',
                        description: '',
                        website: '',
                        officeHoursFrom: '',
                        offideHoursTo: '',
                        offideDaysFrom: '',
                        offideDaysTo: '',
                        menus: []
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
        axios.get('http://localhost:8080/providers')
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
            .catch(error => {
                // console.log(error)
                this.setState({errorMsg: 'Error retreiving data'})
            })
    }

    //TODO: Depending on the user role (client, provider) you see the table with all
    //      users, or your profile (with the according fields for each role).
    //      The admin role sees a Users option.
    //      SEE HOW TO DETERMINE WHICH PAGE YOU SEE DEPENDING ON YOUR ROLE PERMISSION
    //      Maybe a flag userType in the json?

    //RENDER

    updateField = (field) => (ev) => {
        let {newUserData} = this.state;
        newUserData[field] = ev.target.value;
        this.setState({newUserData})
    }

    render() {
        const {users, errorMsg} = this.state

        return (
            <Container>
                <Row>
                    <Col xs={8}>
                        <h1 className="my-3">Proveedores</h1>
                    </Col>
                    <Col xs={2} className="my-3">
                        <Button className="my-3" color="primary" onClick={this.toggleNewUserModal.bind(this)}>
                            Nuevo Proveedor
                        </Button>
                    </Col>
                </Row>

                {/* ADD USER MODAL */}

                <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>
                        Añadir un nuevo Usuario
                    </ModalHeader>
                    <ModalBody>
                        <ModalAlert errorsToShow={this.state.errorMessages} />

                        {/* ADD CLIENT MODAL FORM */}
                        <Form>
                            {/* NAME */}
                            <FormGroup row>
                                <Label for="name" sm={2}>Nombre</Label>
                                <Col sm={10}>
                                    <Input name="name" id="name" placeholder="Escriba su primer nombre"
                                           value={this.state.newUserData.name}
                                            //TODO: CHANGE THE REST
                                           onChange={this.updateField('name')}/>
                                </Col>
                            </FormGroup>

                            {/* STATE */}
                            <FormGroup row>
                                <Label for="state" sm={2}>Ciudad</Label>
                                <Col sm={10}>
                                    <Input name="state" id="state" placeholder="Escriba su ciudad de residencia"
                                           value={this.state.newUserData.state}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.state = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* ADDRESS */}
                            <FormGroup row>
                                <Label for="address" sm={2}>Dirección</Label>
                                <Col sm={10}>
                                    <Input name="address" id="address" placeholder="Escriba su dirección"
                                           value={this.state.newUserData.address}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.address = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* EMAIL */}
                            <FormGroup row>
                                <Label for="email" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email" name="email" id="email" placeholder="Escriba su email"
                                           value={this.state.newUserData.email}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.email = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* PHONE */}
                            <FormGroup row>
                                <Label for="phone" sm={2}>Telefono</Label>
                                <Col sm={10}>
                                    <Input name="phone" id="phone" placeholder="Escriba su telefono"
                                           value={this.state.newUserData.phone}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.phone = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* LOGO */}
                            <FormGroup row>
                                <Label for="logo" sm={2}>Logo</Label>
                                <Col sm={10}>
                                    <Input name="logo" id="logo" placeholder="URL de su Logo"
                                           value={this.state.newUserData.logo}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.logo = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* LATITUDE */}
                            <FormGroup row>
                                <Label for="latitude" sm={2}>Latitud</Label>
                                <Col sm={10}>
                                    <Input name="latitude" id="latitude" placeholder="Latitud"
                                           value={this.state.newUserData.latitude}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.latitude = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* LONGITUDE -- TODO: LAT Y LONG = REEMPLAZAR POR PUNTO EN EL MAPA */}
                            <FormGroup row>
                                <Label for="longitude" sm={2}>Longitud</Label>
                                <Col sm={10}>
                                    <Input name="longitude" id="longitude" placeholder="Longitude"
                                           value={this.state.newUserData.longitude}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.longitude = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* DESCRIPTION */}
                            <FormGroup row>
                                <Label for="description" sm={2}>Descripcion</Label>
                                <Col sm={10}>
                                    <Input type="textarea" name="description" id="description" placeholder="Escriba una descripcion"
                                           value={this.state.newUserData.description}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.description = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* WEBSITE */}
                            <FormGroup row>
                                <Label for="website" sm={2}>Website</Label>
                                <Col sm={10}>
                                    <Input name="website" id="website" placeholder="URL de su pagina web"
                                           value={this.state.newUserData.website}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.website = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* HOURS FROM */}
                            <FormGroup row>
                                <Label for="officeHoursFrom" sm={2}>Inicio horario de atencion</Label>
                                <Col sm={10}>
                                    <Input type="time" name="officeHoursFrom" id="officeHoursFrom"
                                           value={this.state.newUserData.officeHoursFrom}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.officeHoursFrom = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* HOURS TO */}
                            <FormGroup row>
                                <Label for="officeHoursTo" sm={2}>Fin horario de atencion</Label>
                                <Col sm={10}>
                                    <Input type="time" name="officeHoursTo" id="officeHoursTo"
                                           value={this.state.newUserData.officeHoursTo}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.officeHoursTo = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* DAYS FROM */}
                            <FormGroup row>
                                <Label for="officeDaysFrom" sm={2}>Inicio dia de atencion</Label>
                                <Col sm={10}>
                                    <Input type="date" name="officeDaysFrom" id="officeDaysFrom"
                                           value={this.state.newUserData.officeDaysFrom}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.officeDaysFrom = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* DAYS TO */}
                            <FormGroup row>
                                <Label for="officeDaysTo" sm={2}>Fin dia de atencion</Label>
                                <Col sm={10}>
                                    <Input type="date" name="officeDaysTo" id="officeDaysTo"
                                           value={this.state.newUserData.officeDaysTo}
                                           onChange={(e) => {
                                               let {newUserData} = this.state;
                                               newUserData.officeDaysTo = e.target.value;
                                               this.setState({newUserData})
                                           }}/>
                                </Col>
                            </FormGroup>


                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addClient.bind(this)}>
                            Agregar Usuario
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>

                {/* EDIT USER */}

                <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>
                        Editar un Usuario
                    </ModalHeader>
                    <ModalBody>

                        {/* ADD MODAL FORM */}
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

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateClient.bind(this)}>
                            Editar Usuario
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>


                {/* USER CRUD TABLE */}
                <Row>
                    <Col>
                        <Table hover responsive>
                            <thead>
                            <tr>
                                <th hidden>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Ciudad</th>
                                <th>Dirección</th>
                                <th>E-Mail</th>
                                <th>Telefono</th>
                                <th>Credito</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>

                            {/* USER INFO FETCHED FROM SERVER */}
                            <tbody>
                            {users.map(user =>
                                <tr key={user.id}>
                                    <th hidden scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.state}</td>
                                    <td>{user.address}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.accountCredit}</td>

                                    <td>
                                        <Button color='success' size='sm' className='mr-2'
                                                onClick={this.editUser.bind(this, user.id, user.name,
                                                    user.lastname, user.state, user.address,
                                                    user.email, user.phone, user.accountCredit)}>
                                            Editar
                                        </Button>
                                        <Button color='danger' size='sm'
                                                onClick={this.deleteUser.bind(this, user.id)}>
                                            Borrar
                                        </Button>
                                    </td>
                                    {errorMsg ? <div>{errorMsg}</div> : null}
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default Providers