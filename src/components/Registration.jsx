import React from 'react';
import axios from "axios";
import {Alert, Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Label from "reactstrap/es/Label";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";
import Translate from "react-translate-component";
import counterpart from "counterpart";

function ModalAlert({errorsToShow}) {
    const hasErrorsToShow = errorsToShow.length > 0

    if (hasErrorsToShow) {
        return (
            <Alert color="danger">
                {errorsToShow.map(error => <div>{error}</div>)}
            </Alert>
        )
    }
    return <div/>
}

class Registration extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedUser: props.loggedUser,
            // firstLogin: props.loggedUser["http://localhost:8080/is_new"],
            newUserData: {
                name: '',
                lastname: '',
                state: '',
                address: '',
                email: '',
                phone: '',
                accountCredit: 0.0,
            },
            newUserModal: false,
            errorMessages: []
        }
    }

    toggleNewUserModal() {
        this.setState({
            newUserModal: !this.state.newUserModal
        })
    }

    userIsRegistered() {
        return axios.get('http://localhost:8080/clientIsRegistered/' + this.state.loggedUser.email)
            .then(response => {
                if (!response.data) {

                    this.toggleNewUserModal()

                    this.setState({
                        newUserData: {
                            name: this.state.loggedUser.given_name,
                            lastname: this.state.loggedUser.family_name,
                            state: this.state.loggedUser["http://localhost:8080/geoip"].city_name,
                            address: '',
                            email: this.state.loggedUser.email,
                            phone: '',
                            accountCredit: 0.0,
                        }
                    })
                }

            })
    }

    addClient() {
        axios.post('http://localhost:8080/client', this.state.newUserData)
            .then((response) => {
                this.setState(
                    {
                        newUserModal: false,
                        newUserData: {
                            name: '',
                            lastname: '',
                            state: '',
                            address: '',
                            email: '',
                            phone: '',
                            accountCredit: 0.0,
                        },
                        // firstLogin: false
                    });
            })
            .catch((error) => {
                this.setState({
                    errorMessages: error.response.data.errors
                })
            })
    }

    componentDidMount() {
        this.userIsRegistered()
    }

    updateField = (field) => (ev) => {
        let {newUserData} = this.state;
        newUserData[field] = ev.target.value;
        this.setState({newUserData})
    }

    render() {
        const placeholderTranslations = counterpart;

        return (
            <Modal isOpen={this.state.newUserModal} >
                <ModalHeader >
                    <Translate content="labels.newUserRegistration" />
                </ModalHeader>
                <ModalBody>
                    <ModalAlert errorsToShow={this.state.errorMessages}/>

                    {/* ADD CLIENT MODAL FORM */}
                    <Form>
                        {/* NAME */}
                        <FormGroup row>
                            <Label for="name" sm={2}>
                                <Translate content='labels.nameLabel'/>
                            </Label>
                            <Col sm={10}>
                                <Input name="name" id="name" placeholder={placeholderTranslations.translate('placeholders.providerNamePlaceholder')}
                                       value={this.state.newUserData.name}
                                       onChange={this.updateField('name')}/>
                            </Col>
                        </FormGroup>

                        {/* LASTNAME */}
                        <FormGroup row>
                            <Label for="lastname" sm={2}>Apellido</Label>
                            <Col sm={10}>
                                <Input name="lastname" id="lastname" placeholder="Escriba su apellido"
                                       value={this.state.newUserData.lastname}
                                       onChange={(e) => {
                                           let {newUserData} = this.state;
                                           newUserData.lastname = e.target.value;
                                           this.setState({newUserData})
                                       }}/>
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

                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.addClient.bind(this)}>
                        Confirmar
                    </Button>{' '}
                </ModalFooter>
            </Modal>
        )
    }
}

export default Registration