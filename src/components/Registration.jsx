import React from 'react';
import axios from "axios";
import {Alert, Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Label from "reactstrap/es/Label";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import ModalAlert from "./Alerts/ModalAlert";

class Registration extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedUser: props.loggedUser,
            userRegistered: '',
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
                        userRegistered: !response.data,
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.userRegistered !== this.state.userRegistered) {
            this.setState({
                userRegistered: this.props.userRegistered
            })
        }
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
                                <Input name="name" id="name" placeholder={placeholderTranslations.translate('placeholders.clientNamePlaceholder')}
                                       value={this.state.newUserData.name}
                                       onChange={this.updateField('name')}/>
                            </Col>
                        </FormGroup>

                        {/* LASTNAME */}
                        <FormGroup row>
                            <Label for="lastname" sm={2}>
                                <Translate content='labels.lastNameLabel' />
                            </Label>
                            <Col sm={10}>
                                <Input name="lastname" id="lastname" placeholder={placeholderTranslations.translate('placeholders.clientLastnamePlaceholder')}
                                       value={this.state.newUserData.lastname}
                                       onChange={this.updateField('lastname')}/>
                            </Col>
                        </FormGroup>

                        {/* STATE */}
                        <FormGroup row>
                            <Label for="state" sm={2}>
                                <Translate content='labels.stateLabel'/>
                            </Label>
                            <Col sm={10}>
                                <Input name="state" id="state"
                                       placeholder={placeholderTranslations.translate('placeholders.statePlaceholder')}
                                       value={this.state.newUserData.state}
                                       onChange={this.updateField('state')}/>
                            </Col>
                        </FormGroup>

                        {/* ADDRESS */}
                        <FormGroup row>
                            <Label for="address" sm={2}>
                                <Translate content='labels.addressLabel'/>
                            </Label>
                            <Col sm={10}>
                                <Input name="address" id="address"
                                       placeholder={placeholderTranslations.translate('placeholders.addressPlaceholder')}
                                       value={this.state.newUserData.address}
                                       onChange={this.updateField('address')}/>
                            </Col>
                        </FormGroup>

                        {/* EMAIL */}
                        <FormGroup row>
                            <Label for="email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" id="email"
                                       placeholder={placeholderTranslations.translate('placeholders.emailPlaceholder')}
                                       value={this.state.newUserData.email}
                                       onChange={this.updateField('email')}/>
                            </Col>
                        </FormGroup>

                        {/* PHONE */}
                        <FormGroup row>
                            <Label for="phone" sm={2}>
                                <Translate content='labels.phoneLabel'/>
                            </Label>
                            <Col sm={10}>
                                <Input name="phone" id="phone"
                                       placeholder={placeholderTranslations.translate('placeholders.phonePlaceholder')}
                                       value={this.state.newUserData.phone}
                                       onChange={this.updateField('phone')}/>
                            </Col>
                        </FormGroup>

                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.addClient.bind(this)}>
                        <Translate content="buttons.confirmButton"/>
                    </Button>{' '}
                </ModalFooter>
            </Modal>
        )
    }
}

export default Registration