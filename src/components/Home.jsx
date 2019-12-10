import React from 'react';
import counterpart from "counterpart";
import axios from "axios";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle, CustomInput, Form, FormGroup, Input, Label, Modal,
    ModalBody, ModalFooter,
    ModalHeader
} from "reactstrap";
import CardDeck from "reactstrap/es/CardDeck";
import Translate from 'react-translate-component';
import Col from "reactstrap/es/Col";
import Container from "reactstrap/es/Container";
import ModalAlert from "./Alerts/ModalAlert";
import MenusButton from "./Buttons/MenusButton";

function BecomeAProvider(props) {
    const enabled = props.enabled
    const onClickFunction = props.onClick

    if (enabled) {
        return (
            <Col sm={4} style={{textAlign: 'center', padding: 20}}>
                <Card>
                    <CardImg top width="100%" src="/assets/provider.jpg" alt=""/>
                    <CardBody>
                        <CardTitle>
                            <Translate style={{fontSize: '130%'}} content='buttons.beAProvider'/>
                        </CardTitle>
                        {/*<CardText>*/}
                        {/*    Translated Text*/}
                        {/*</CardText>*/}
                        <Button onClick={onClickFunction}>
                            <Translate content='buttons.beAProvider'/>
                        </Button>
                    </CardBody>
                </Card>
            </Col>
        )
    } else {
        return <div/>
    }
}

class Home extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            newUserData: {
                type: '',
                name: '',
                state: '',
                address: '',
                email: '',
                phone: '',
                accountCredit: '',
                logo: '',
                latitude: props.loggedUser["http://localhost:8080/geoip"].latitude,
                longitude: props.loggedUser["http://localhost:8080/geoip"].longitude,
                description: '',
                website: '',
                officeHoursFrom: '',
                officeHoursTo: '',
                officeDaysFrom: '',
                officeDaysTo: '',
                menus: '',
                delivery: false

            },
            loggedUser: props.loggedUser,
            becomeAProviderModal: false,
            errorMessages: [],
            menus: []
        }
    }

    updateUserByEmail(email) {
        return axios.get('http://localhost:8080/userWithEmail/' + email)
            .then((response) => {
                let user = response.data
                this.setState({
                    newUserData: {
                        id: user.id,
                        type: user.type,
                        name: user.name,
                        state: user.state,
                        address: user.address,
                        email: user.email,
                        phone: user.phone,
                        accountCredit: user.accountCredit,
                        logo: '',
                        latitude: this.state.loggedUser["http://localhost:8080/geoip"].latitude,
                        longitude: this.state.loggedUser["http://localhost:8080/geoip"].longitude,
                        description: '',
                        website: '',
                        officeHoursFrom: '',
                        officeHoursTo: '',
                        officeDaysFrom: '',
                        officeDaysTo: '',
                        menus: user.menus,
                        delivery: user.delivery
                    }
                })
            })
    }

    componentDidMount() {
        this.updateUserByEmail(this.state.loggedUser.email);
        this._refreshMenus();
    }

    _refreshMenus() {
        axios.get('http://localhost:8080/menus')
            .then(response => {
                this.setState({
                    menus: response.data
                })
            })
    }

    toggleBecomeAProviderModal() {
        this.setState({
            becomeAProviderModal: !this.state.becomeAProviderModal,
            errorMessages: []
        })
    }

    updateUserField = (field) => (ev) => {
        let {newUserData} = this.state;
        newUserData[field] = ev.target.value;
        this.setState({newUserData})
    }

    convertClientToProvider() {
        let {
            name, state, address, email, phone, accountCredit, logo, latitude, longitude,
            description, website, officeHoursFrom, officeHoursTo, officeDaysFrom, officeDaysTo, menus, delivery
        } = this.state.newUserData;

        axios.post('http://localhost:8080/convertClientToProvider/' + this.state.newUserData.id, {
            name, state, address, email, phone, accountCredit, logo, latitude, longitude,
            description, website, officeHoursFrom, officeHoursTo, officeDaysFrom, officeDaysTo, menus, delivery
        })
            .then((response) => {
                this.setState({
                    becomeAProviderModal: false,
                })
            })
        this.refreshPage()
    }

    refreshPage() {
        window.parent.location = window.parent.location.href;
    }

    render() {
        const placeholderTranslations = counterpart;
        let isProvider = this.state.newUserData.type === 'provider';
        let menus = this.state.menus;

        return (
            <Container fluid={true}>
                <CardDeck>
                    {menus.map(menu =>
                        <Col sm={4} style={{textAlign: 'center', padding: 20}}>
                            <Card>
                                <CardImg top width="100%" src="/assets/pizza1.jpg" alt=""/>
                                <CardBody>
                                    <CardTitle style={{fontSize: '130%'}}>{menu.name}</CardTitle>
                                    <CardSubtitle style={{fontSize: '70%'}}>{menu.category}</CardSubtitle>
                                    <CardText>{menu.description}</CardText>
                                    <MenusButton
                                        userId={menu.providerId}
                                        clientId={this.state.newUserData.id}/>
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                    <BecomeAProvider
                        onClick={this.toggleBecomeAProviderModal.bind(this)}
                        enabled={!isProvider}/>
                </CardDeck>

                <Modal isOpen={this.state.becomeAProviderModal} toggle={this.toggleBecomeAProviderModal.bind(this)}>
                    <ModalHeader toggle={this.toggleBecomeAProviderModal.bind(this)}>
                        <Translate content='newProviderModalTitle'/>
                    </ModalHeader>
                    <ModalBody>
                        <ModalAlert errorsToShow={this.state.errorMessages}/>
                        <Form>

                            {/* NAME */}
                            <FormGroup row>
                                <Label for="name" sm={2}>
                                    <Translate content='labels.nameLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="name" id="name"
                                           placeholder={placeholderTranslations.translate('placeholders.providerNamePlaceholder')}
                                           value={this.state.newUserData.name}
                                           onChange={this.updateUserField('name')}/>
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
                                           onChange={this.updateUserField('state')}/>
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
                                           onChange={this.updateUserField('address')}/>
                                </Col>
                            </FormGroup>

                            {/* EMAIL */}
                            <FormGroup row>
                                <Label for="email" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email" name="email" id="email"
                                           placeholder={placeholderTranslations.translate('placeholders.emailPlaceholder')}
                                           value={this.state.newUserData.email}
                                           onChange={this.updateUserField('email')}/>
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
                                           onChange={this.updateUserField('phone')}/>
                                </Col>
                            </FormGroup>

                            {/* LOGO */}
                            <FormGroup row>
                                <Label for="logo" sm={2}>Logo</Label>
                                <Col sm={10}>
                                    <Input name="logo" id="logo"
                                           placeholder={placeholderTranslations.translate('placeholders.logoPlaceholder')}
                                           value={this.state.newUserData.logo}
                                           onChange={this.updateUserField('logo')}/>
                                </Col>
                            </FormGroup>

                            {/* LATITUDE */}
                            <FormGroup row>
                                <Label for="latitude" sm={2}>
                                    <Translate content='labels.latitudeLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="latitude" id="latitude"
                                           placeholder={placeholderTranslations.translate('placeholders.latitudePlaceholder')}
                                           value={this.state.newUserData.latitude}
                                           onChange={this.updateUserField('latitude')}/>
                                </Col>
                            </FormGroup>

                            {/* LONGITUDE -- TODO: LAT Y LONG = REEMPLAZAR POR PUNTO EN EL MAPA */}
                            <FormGroup row>
                                <Label for="longitude" sm={2}>
                                    <Translate content='labels.longitudeLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="longitude" id="longitude"
                                           placeholder={placeholderTranslations.translate('placeholders.longitudePlaceholder')}
                                           value={this.state.newUserData.longitude}
                                           onChange={this.updateUserField('longitude')}/>
                                </Col>
                            </FormGroup>

                            {/* DESCRIPTION */}
                            <FormGroup row>
                                <Label for="description" sm={2}>
                                    <Translate content='labels.descriptionLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="textarea" name="description" id="description"
                                           placeholder={placeholderTranslations.translate('placeholders.descriptionPlaceholder')}
                                           value={this.state.newUserData.description}
                                           onChange={this.updateUserField('description')}/>
                                </Col>
                            </FormGroup>

                            {/* WEBSITE */}
                            <FormGroup row>
                                <Label for="website" sm={2}>
                                    <Translate content='labels.websiteLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="website" id="website"
                                           placeholder={placeholderTranslations.translate('placeholders.websitePlaceholder')}
                                           value={this.state.newUserData.website}
                                           onChange={this.updateUserField('website')}/>
                                </Col>
                            </FormGroup>

                            {/* HOURS FROM */}
                            <FormGroup row>
                                <Label for="officeHoursFrom" sm={2}>
                                    <Translate content='labels.hoursFromLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="time" name="officeHoursFrom"
                                           id="officeHoursFrom"
                                           value={this.state.newUserData.officeHoursFrom}
                                           onChange={this.updateUserField('officeHoursFrom')}/>
                                </Col>
                            </FormGroup>

                            {/* HOURS TO */}
                            <FormGroup row>
                                <Label for="officeHoursTo" sm={2}>
                                    <Translate content='labels.hoursToLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="time" name="officeHoursTo" id="officeHoursTo"
                                           value={this.state.newUserData.officeHoursTo}
                                           onChange={this.updateUserField('officeHoursTo')}/>
                                </Col>
                            </FormGroup>

                            {/* DAYS FROM */}
                            <FormGroup row>
                                <Label for="officeDaysFrom" sm={2}>
                                    <Translate content='labels.officeDaysFromLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <CustomInput type="select" name="officeDaysFrom" id="officeDaysFrom"
                                                 value={this.state.newUserData.officeDaysFrom}
                                                 onChange={this.updateUserField('officeDaysFrom')}>
                                        <option value="">
                                            {counterpart.translate('labels.chooseADayLabel')}
                                        </option>
                                        <option>MONDAY</option>
                                        <option>TUESDAY</option>
                                        <option>WEDNESDAY</option>
                                        <option>THURSDAY</option>
                                        <option>FRIDAY</option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>

                            {/* DAYS TO */}
                            <FormGroup row>
                                <Label for="officeDaysTo" sm={2}>
                                    <Translate content='labels.officeDaysToLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <CustomInput type="select" name="officeDaysTo" id="officeDaysTo"
                                                 value={this.state.newUserData.officeDaysTo}
                                                 onChange={this.updateUserField('officeDaysTo')}>
                                        <option value="">
                                            {counterpart.translate('labels.chooseADayLabel')}
                                        </option>
                                        <option>MONDAY</option>
                                        <option>TUESDAY</option>
                                        <option>WEDNESDAY</option>
                                        <option>THURSDAY</option>
                                        <option>FRIDAY</option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>


                            {/* DELIVERY */}
                            {/*<FormGroup check>*/}
                            {/*    <Label check>*/}
                            {/*        <Input type="checkbox" name="delivery" id="delivery"*/}
                            {/*               value={this.state.newUserData.delivery}*/}
                            {/*               onChange={this.updateEditUserField('delivery')}/>*/}
                            {/*        Hace delivery*/}
                            {/*    </Label>*/}
                            {/*</FormGroup>*/}

                        </Form>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.convertClientToProvider.bind(this)}>
                            <Translate content='buttons.confirmButton'/>
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleBecomeAProviderModal.bind(this)}>
                            <Translate content='buttons.cancelButton'/>
                        </Button>
                    </ModalFooter>

                </Modal>
            </Container>


        )
    }
}

export default Home