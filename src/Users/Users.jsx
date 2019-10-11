import React from 'react'
import axios from 'axios'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import Label from "reactstrap/es/Label";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";

class Users extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            newUserModal: false
        }
    }

    //METHODS

    componentDidMount() {
        //TODO: CHANGE THIS WITH THE HEROKU URL
        axios.get('http://viandas-ya.herokuapp.com/users')
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

    toggleNewUserModal() {
        this.setState({
            newUserModal: true
        })
    }

    //RENDER

    render() {
        const {users, errorMsg} = this.state

        return (
            <div>
                <h1>Users</h1>

                {/* EDIT MODAL */}
                <div>
                    <Button color="primary" onClick={this.toggleNewUserModal.bind(this)}>
                        Nuevo Usuario
                    </Button>
                    <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)}>
                        <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>
                            Añadir un nuevo Usuario
                        </ModalHeader>
                        <ModalBody>

                            <Form>
                                <FormGroup row>
                                    <Label for="name" sm={2}>Nombre</Label>
                                    <Col sm={10}>
                                        <Input name="name" id="name" placeholder="Escriba su primer nombre"/>
                                    </Col>
                                </FormGroup>
                            </Form>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleNewUserModal.bind(this)}>
                                Do Something
                            </Button>{' '}
                            <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>

                {/* USER CRUD TABLE */}
                <Table>
                    <thead>
                    <tr>
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
                            <td>{user.name}</td>
                            <td>{user.lastname}</td>
                            <td>{user.state}</td>
                            <td>{user.address}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.accountCredit}</td>

                            <td>
                                <Button color='success' size='sm' className='mr-2'>
                                    Editar
                                </Button>
                                <Button color='danger' size='sm'>
                                    Borrar
                                </Button>
                            </td>
                            {errorMsg ? <div>{errorMsg}</div> : null}
                        </tr>
                    )}
                    </tbody>
                </Table>

            </div>
        )
    }

}

export default Users