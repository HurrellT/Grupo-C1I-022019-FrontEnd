import React from 'react'
import axios from 'axios'
import {Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Label from "reactstrap/es/Label";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import ModalAlert from "../Alerts/ModalAlert";

class Users extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedUser: props.loggedUser,
            newUserData: {
                id: '',
                name: '',
                lastname: '',
                state: '',
                address: '',
                email: '',
                phone: '',
                accountCredit: 0.0,
            },
            accountCreditModal: false,
            amount: '',
            errorMessages: []
        }
    }

    //METHODS

    componentDidMount() {
        this.getUserByEmail(this.state.loggedUser.email)
    }

    getUserByEmail(email) {
        axios.get('http://localhost:8080/userWithEmail/' + email)
            .then((response) => {
                let user = response.data;
                this.setState({
                    newUserData: {
                        id: user.id,
                        name: user.name,
                        lastname: user.lastname,
                        state: user.state,
                        address: user.address,
                        email: user.email,
                        phone: user.phone,
                        accountCredit: user.accountCredit,
                    }
                })
            })
    }

    updateClient() {
        let {name, lastname, state, address, email, phone, accountCredit} = this.state.newUserData;

        axios.put('http://localhost:8080/client/' + this.state.newUserData.id, {
            name, lastname, state, address, email, phone, accountCredit
        })
        this.refreshPage()
    }

    withdrawCredit() {
        axios.post('http://localhost:8080/withdrawCredit/' + this.state.newUserData.id + "/" + this.state.amount)
            .then((response) => {
                this.setState({
                    accountCreditModal: false,
                    amount: ''
                })
            })
            .catch((error) => {
                this.setState({
                    errorMessages: [error.response.data.message]
                })
            })
        this.refreshPage()
    }

    depositCredit() {
        axios.post('http://localhost:8080/depositCredit/' + this.state.newUserData.id + "/" + this.state.amount)
            .then((response) => {
                this.setState({
                    accountCreditModal: false,
                    amount: ''
                })
            })
            .catch((error) => {
                this.setState({
                    errorMessages: [error.response.data.message]
                })
            })
        this.refreshPage()
    }

    editAccountCredit(id, name, lastname, state,
                      address, email, phone, accountCredit) {
        this.setState({
            newUserData: {id, name, lastname, state,
                address, email, phone, accountCredit},
            accountCreditModal: !this.state.accountCreditModal
        })
    }

    toggleAccountCreditModal() {
        this.setState({
            accountCreditModal: !this.state.accountCreditModal,
            errorMessages: []
        })
    }

    //RENDER

    updateField = (field) => (ev) => {
        let {newUserData} = this.state;
        newUserData[field] = ev.target.value;
        this.setState({newUserData})
    }

    refreshPage() {
        window.parent.location = window.parent.location.href;
    }

    render() {

        const placeholderTranslations = counterpart;
        const username = this.state.newUserData.name;
        const credit = this.state.newUserData.accountCredit;
        let user = this.state.newUserData;
        let locale = localStorage.getItem('locale');
        let currency = localStorage.getItem('currency');

        return (
            <Container fluid={true}>

                <Row>
                    <Col xs={8}>
                        <h1 className="my-3">
                            <Translate content="myAccount"/>
                        </h1>
                    </Col>
                    <Col xs={2} className="my-3">
                        <Button
                            color="primary"
                            onClick={this.editAccountCredit.bind(
                                this, user.id, user.name, user.lastname,
                                user.state, user.address, user.email,
                                user.phone, user.accountCredit)}>
                            <Translate content='buttons.accountCreditButton'/>
                        </Button>
                    </Col>
                </Row>
                <Form style={{padding:20}}>
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

                    <FormGroup row>
                        <Label for="accountCredit" sm={2}>
                            <Translate content='labels.accountCreditLabel' />
                        </Label>
                        <Col sm={10}>
                            <Input plaintext value={
                                new Intl.NumberFormat(locale, {
                                style: 'currency',
                                currency: currency,
                                currencyDisplay:'code',
                                }).format(user.accountCredit)}/>
                        </Col>
                    </FormGroup>

                </Form>

                <Modal isOpen={this.state.accountCreditModal} toggle={this.toggleAccountCreditModal.bind(this)}>
                    <ModalHeader toggle={this.toggleAccountCreditModal.bind(this)}>
                        <Translate content='accountCreditModalTitle' with={{username}}/>
                    </ModalHeader>
                    <ModalBody>
                        <ModalAlert errorsToShow={this.state.errorMessages}/>
                        <Form>

                            {/* ACCOUNT CREDIT */}

                            <FormGroup row>
                                <Col sm={10}>
                                    <h6><Translate content='labels.availableAccountCredit' with={{credit}}/></h6>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="accountCredit" sm={2}>
                                    <Translate content='labels.accountCreditLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="accountCredit" id="accountCredit"
                                           placeholder={placeholderTranslations.translate('placeholders.accountCreditPlaceholder')}
                                           value={this.state.amount}
                                           onChange={(e) => {
                                               let {amount} = this.state.amount;
                                               amount = e.target.value;
                                               this.setState({amount: amount})
                                           }}/>
                                </Col>
                            </FormGroup>

                        </Form>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.depositCredit.bind(this)}>
                            <Translate content='buttons.depositCredit'/>
                        </Button>{' '}
                        <Button color="primary" onClick={this.withdrawCredit.bind(this)}>
                            <Translate content='buttons.withdrawCredit'/>
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleAccountCreditModal.bind(this)}>
                            <Translate content='buttons.cancelButton'/>
                        </Button>
                    </ModalFooter>

                </Modal>

                <Row>
                    <Col xs={2} className="my-3">
                        <Button color="primary" onClick={this.updateClient.bind(this)}>
                            <Translate content="editClient"/>
                        </Button>{' '}
                    </Col>
                    <Col xs={2} className="my-3">
                        <Button color="secondary" href="/home">
                            <Translate content="buttons.cancelButton" />
                        </Button>
                    </Col>
                </Row>

            </Container>
        )
    }

}

export default Users