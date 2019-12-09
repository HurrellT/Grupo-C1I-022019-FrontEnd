import React from 'react'
import axios from 'axios'
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Alert, CustomInput} from 'reactstrap';
import Label from "reactstrap/es/Label";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import NumericInput from 'react-numeric-input';
import Menus from "./Menus";
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import {useAuth0} from "../../react-auth0-spa";

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

function AddMenuButton(props) {
    const enabled = props.enabled;
    const onClickFunction = props.onClick;

    if (enabled) {
        return (
            <Button className="my-3" color="primary" onClick={onClickFunction}>
                <Translate content='buttons.newMenuButton'/>
            </Button>
        )
    }
    else {
        return <div/>
    }
}

class ProviderMenus extends Menus {

    //METHODS

    componentDidMount() {
        let {provId, clientId} = this.props.match.params;
        this.setState({
                        purchaseMaked: false,
                        loggedClientId: clientId
                        });
        super.getProviderName(provId);
        this.getPendingScoredPurchases(clientId);
        this.getUserById(clientId);
        this._refreshMenus(provId);
    }

    getUserById(id) {
        axios.get('http://localhost:8080/userById/' + id)
            .then((response) => {
                let user = response.data
                this.setState({
                    user: user
                }, () => {
                    if (this.state.user.type === 'client') {
                        axios.get('http://localhost:8080/pendingScoredPurchases/' + this.state.user.id)
                            .then(response => {
                                this.state.pendigScoredPurchases = response.data;
                            })
                            .catch(error => {
                                // console.log(error)
                                this.setState({errorMsg: 'Error retreiving data'})
                            })
                    }
                })
            })
    }


    _refreshMenus(provId) {
        axios.get('http://localhost:8080/menusp/' + provId)
            .then(response => {
                this.setState({
                    menus: response.data
                })
            })
    }

    //RENDER

    render() {
        const {menus, purchaseMenus, errorMsg} = this.state
        const placeholderTranslations = counterpart;
        const providername = this.providerName;
       
        let filteredMenus = menus.filter(
            (menu) => {
                return menu.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        let isProvider = this.state.user.type === 'provider';

        return (
            <Container>
                <Row>
                    <Col xs={8}>
                        <h1 className="my-3">
                            <Translate content='titles.providerMenusTitle' with={{providername}}/>
                        </h1>
                    </Col>
                    <Col xs={8} className="my-3">
                        <Label for="search" sm={3} style={{width: 300, padding: 19}} >
                        <b><Translate content='labels.nameFilterLabel'/></b></Label>
                        <input type = "text"
                               style={{width: 300}}
                               placeholder = {placeholderTranslations.translate('placeholders.filterMenuNamePlaceholder')}
                               value = {this.state.search}
                               onChange = {this.updateSearch.bind(this)}/>
                    </Col>
                    <Col xs={2} className="my-3">
                        <AddMenuButton
                            onClick={this.toggleNewMenuModal.bind(this)}
                            enabled={isProvider} />
                    </Col>
                    <Col xs={2} className="my-3">
                        <Button className="my-3" color="primary" onClick={this.seeMyPurchase.bind(this)}>
                            <Translate content='buttons.seePurchaseButton'/>
                        </Button>
                    </Col>
                </Row>

                {/* ADD MENU MODAL */}

                <Modal isOpen={this.state.newMenuModal} toggle={this.toggleNewMenuModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewMenuModal.bind(this)}>
                        <Translate content='titles.addMenuTitle'/>
                    </ModalHeader>
                    <ModalBody>
                        <ModalAlert errorsToShow={this.state.errorMessages} />

                        {/* ADD CLIENT MODAL FORM */}
                        <Form>
                            {/* NAME */}
                            <FormGroup row>
                                <Label for="name" sm={10}>
                                    <Translate content='labels.nameLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="name" id="name"
                                           placeholder={placeholderTranslations.translate('placeholders.filterMenuNamePlaceholder')}
                                           value={this.state.newMenuData.name}
                                           onChange={this.updateField('name')}/>
                                </Col>
                            </FormGroup>

                            {/* DESCRIPTION */}
                            <FormGroup row>
                                <Label for="description" sm={10}>
                                    <Translate content='labels.descriptionLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="description" id="description"
                                           placeholder={placeholderTranslations.translate('placeholders.menuDescriptionPlaceholder')}
                                           value={this.state.newMenuData.description}
                                           onChange={(e) => {
                                               let {newMenuData} = this.state;
                                               newMenuData.description = e.target.value;
                                               this.setState({newMenuData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* CATEGORY */}
                            <FormGroup row>
                                <Label for="category" sm={10}>
                                    <Translate content='labels.categoryLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="category" id="category" placeholder="Escriba la categoría del menú"
                                           value={this.state.newMenuData.category}
                                           onChange={(e) => {
                                               let {newMenuData} = this.state;
                                               newMenuData.category = e.target.value;
                                               this.setState({newMenuData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* DELIVERY PRICE */}
                            <FormGroup row>
                                <Label for="deliveryPrice" sm={10}>
                                    <Translate content='labels.deliveryPriceLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="deliveryPrice" name="deliveryPrice" id="deliveryPrice"
                                           placeholder={placeholderTranslations.translate('placeholders.deliveryPricePlaceholder')}
                                           value={this.state.newMenuData.deliveryPrice}
                                           onChange={(e) => {
                                               let {newMenuData} = this.state;
                                               newMenuData.deliveryPrice = e.target.value;
                                               this.setState({newMenuData})
                                           }}/>
                                </Col>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addMenu.bind(this)}>
                            <Translate content='buttons.addMenuButton'/>
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewMenuModal.bind(this)}>
                            <Translate content='buttons.cancelButton'/>
                        </Button>
                    </ModalFooter>
                </Modal>

                {/* BUY RESULT */}

                <Modal isOpen={this.state.messageModal} toggle={this.toggleMessageModal.bind(this)}>
                    <ModalHeader toggle={this.toggleMessageModal.bind(this)}>
                        <Translate content='titles.informationTitle'/>
                    </ModalHeader>
                    <ModalBody>
                         <ModalAlert errorsToShow={this.state.errorMessages} />

                         {/* ADD MENU MODAL FORM */}
                         <Form>
                             {/* NAME */}
                             <FormGroup row>
                                 <Label sm={20}>{this.state.message}</Label>
                             </FormGroup>
                         </Form>

                     </ModalBody>
                     <ModalFooter>
                         <Button color="primary" onClick={this.toggleMessageModal.bind(this)}>
                             <Translate content='buttons.acceptButton'/>
                         </Button>
                     </ModalFooter>

                </Modal>

                {/* ASK QUANTITY MODAL */}
                <Modal isOpen={this.state.askQuantityModal} toggle={this.toggleAskQuantityModal.bind(this)}>
                    <ModalHeader toggle={this.toggleAskQuantityModal.bind(this)}>
                        <Translate content='titles.selectQuantityTitle'/>
                    </ModalHeader>
                    <ModalBody>
                         <ModalAlert errorsToShow={this.state.errorMessages} />

                         {/* ADD MENU MODAL FORM */}
                         <Form>
                             {/* QUANTITY */}
                             <FormGroup row>
                                 <Col sm={10}>
                                     <NumericInput min={1} value={this.state.purchaseRequest.quantity}
                                        onChange={(value) =>{
                                            let {purchaseRequest} = this.state;
                                            purchaseRequest.quantity = value;
                                            this.setState({purchaseRequest})
                                     }}/>
                                 </Col>
                             </FormGroup>
                         </Form>

                     </ModalBody>
                     <ModalFooter>
                         <Button color="primary" onClick={this.acceptPurchaseData.bind(this)}>
                             <Translate content='buttons.acceptButton'/>
                         </Button>
                         <Button color="secondary" onClick={this.toggleAskQuantityModal.bind(this)}>
                             <Translate content='buttons.cancelButton'/>
                         </Button>
                     </ModalFooter>
                </Modal>

                {/* PURCHASE MODAL */}
                <Modal isOpen={this.state.purchaseModal} toggle={this.togglePurchaseModal.bind(this)}
                       style={{width: 3000}}>
                    <ModalHeader toggle={this.togglePurchaseModal.bind(this)}>
                        <Translate content='titles.providerPurchaseTitle' with={{providername}}/>
                    </ModalHeader>
                    <ModalBody>
                         <ModalAlert errorsToShow={this.state.errorMessages} />

                         <Row>
                             <Col>
                                 <Table hover responsive>
                                     <thead>
                                     <tr>
                                         <th hidden>#</th>
                                         <th><Translate content='labels.nameLabel'/></th>
                                         <th><Translate content='labels.quantityLabel'/></th>
                                         <th><Translate content='labels.priceLabel'/></th>
                                         <th><Translate content='labels.actionsLabel'/></th>
                                     </tr>
                                     </thead>

                                     {/* PURCHASE INFO FETCHED FROM SERVER */}
                                     <tbody>
                                     { purchaseMenus.map(menu =>
                                         <tr key={menu.name}>
                                             <td>{menu.name}</td>
                                             <td>{menu.quantity}</td>
                                             <td>{menu.price}</td>
                                             <td>
                                                <Button color='warning' size='sm'
                                                         onClick={this.askForQuantity.bind(this, menu.name, menu.providerId)}>
                                                     <Translate content='buttons.changeQuantityButton'/>
                                                </Button>
                                                <Button color='danger' size='sm'
                                                        onClick={this.removeFromPurchase.bind(this, menu.name)}>
                                                    <Translate content='buttons.removeFromPurchaseButton'/>
                                                </Button>
                                             </td>
                                         </tr>
                                     )}
                                     </tbody>
                                 </Table>
                             </Col>
                         </Row>
                         <Form>
                            {/* NAME */}
                            <FormGroup row>
                                <Label for="total" sm={2}><b>Total:</b></Label>
                                <Col sm={5}>
                                    <Label sm={10}><b>{this.state.totalAmount}</b></Label>
                                </Col>
                            </FormGroup>
                         </Form>

                     </ModalBody>
                     <ModalFooter>
                         <Button color="primary" onClick={this.togglePurchaseDataModal.bind(this)}>
                             <Translate content='buttons.makeThePurchaseButton'/>
                         </Button>
                     </ModalFooter>
                </Modal>

                {/* PURCHASE DATA MODAL */}
                <Modal isOpen={this.state.purchaseDataModal} toggle={this.togglePurchaseDataModal.bind(this)}
                       style={{width: 3000}}>
                    <ModalHeader toggle={this.togglePurchaseDataModal.bind(this)}>
                        <Translate content='buttons.selectPurchaseDataButton'/>
                    </ModalHeader>
                    <ModalBody>
                        <ModalAlert errorsToShow={this.state.errorMessages} />

                        {/* PURCHASE DATA FORM */}
                        <Form>

                            {/* DELIVERY TIME */}
                            <FormGroup row>
                                <Label for="deliveryTime" sm={2}>
                                    <Translate content='labels.deliveryTimeLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="time" name="deliveryTime" id="deliveryTime"
                                           value={this.state.purchaseRequest.deliveryTime}
                                           onChange={this.updatePrField('deliveryTime')}
                                    />
                                </Col>
                            </FormGroup>

                            {/* DELIVERY DATE */}
                            <FormGroup row>
                                <Label for="deliveryDate" sm={2}>
                                    <Translate content='labels.deliveryDateLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="date" name="deliveryDate" id="deliveryDate"
                                           value={this.state.purchaseRequest.deliveryDate}
                                           onChange={this.updatePrField('deliveryDate')}
                                    />
                                </Col>
                            </FormGroup>

                            {/* DELIVERY TYPE */}
                            <FormGroup row>
                                <Label for="deliveryType" sm={2}>
                                    <Translate content='labels.deliveryTypeLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <CustomInput type="select" name="deliveryType" id="deliveryType"
                                           value={this.state.purchaseRequest.deliveryType}
                                           onChange={this.updatePrField('deliveryType')}>
                                        <option value="">
                                            {counterpart.translate('labels.chooseADeliveryTypeLabel')}
                                        </option>
                                        <option>DELIVERY</option>
                                        <option>PICK UP</option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>

                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.setPurchaseData.bind(this)} disabled={this.state.validDate}>
                            <Translate content='buttons.acceptButton'/>
                        </Button>
                    </ModalFooter>
                </Modal>

                {/* MENU CRUD TABLE */}
                <Row>
                    <Col>
                        <Table hover responsive>
                            <thead>
                            <tr>
                                <th hidden>#</th>
                                <th><Translate content='labels.nameLabel'/></th>
                                <th><Translate content='labels.descriptionLabel'/></th>
                                <th><Translate content='labels.categoryLabel'/></th>
                                <th><Translate content='labels.priceLabel'/></th>
                                <th><Translate content='labels.actionsLabel'/></th>
                            </tr>
                            </thead>

                            {/* MENU INFO FETCHED FROM SERVER */}
                            <tbody>
                            {filteredMenus.map(menu =>
                                <tr key={menu.id}>
                                    <th hidden scope="row">{menu.id}</th>
                                    <td>{menu.name}</td>
                                    <td>{menu.description}</td>
                                    <td>{menu.category}</td>
                                    <td>{menu.price}</td>
                                    <td>
                                        <Button color='warning' size='sm'
                                                onClick={this.askForQuantity.bind(this, menu.name, menu.providerId)}>
                                            <Translate content='buttons.addMenuToPurchaseButton'/>
                                        </Button>
                                    </td>
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

export default ProviderMenus