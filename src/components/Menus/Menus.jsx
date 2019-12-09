import React from 'react'
import axios from 'axios'
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Alert, CustomInput} from 'reactstrap';
import Label from "reactstrap/es/Label";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import NumericInput from 'react-numeric-input';

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

function SeePurchasesButton(props) {
    const enabled = props.enabled;
    const onClickFunction = props.onClick;

    if (enabled) {
        return (
            <Button className="my-3" color="primary" onClick={onClickFunction}>
                <Translate content='buttons.seePurchaseButton'/>
            </Button>
        )
    }
    else {
        return <div/>
    }
}

class Menus extends React.Component {

    constructor(props) {
        super(props)

        this.providerName = '';
        this.pendigScoredPurchases = '0';
        this.state = {
            loggedUser: props.loggedUser,
            loggedClientId: '0',
            user: '',
            menus: [],
            menuNames: [],
            purchases: [],
            purchaseMenus: [],
            purchasesHistory: [],
            totalAmount: 0,
            search: '',
            purchaseRequest: {
                providerId: '',
                menuName: '',
                quantity: '1',
                deliveryTime: '',
                deliveryDate: '',
                deliveryType: ''
            },
            newMenuData: {
                name: '',
                description: '',
                category: '',
                deliveryPrice: '',
                effectiveDateFrom: '',
                effectiveDateTo: '',
                dayNight: '',
                effectiveDeliveryHoursFrom: '',
                effectiveDeliveryHoursTo: '',
                deliveryType: '',
                averageDeliveryTime: '',
                price: '',
                maximumAllowedSells: '',
                minimumAmount: '',
                minimumAmountPrice: '',
                minimumAmount2: '',
                minimumAmount2Price: '',
                providerId: '',
                providerName: '',
                score: []
            },
            editMenuData: {
                name: '',
                description: '',
                category: '',
                deliveryPrice: '',
                effectiveDateFrom: '',
                effectiveDateTo: '',
                dayNight: '',
                effectiveDeliveryHoursFrom: '',
                effectiveDeliveryHoursTo: '',
                deliveryType: '',
                averageDeliveryTime: '',
                price: '',
                maximumAllowedSells: '',
                minimumAmount: '',
                minimumAmountPrice: '',
                minimumAmount2: '',
                minimumAmount2Price: '',
                providerId: '',
                providerName: '',
                score: []
            },
            validDate: false,
            purchaseMaked: false,
            message: '',
            newMenuModal: false,
            editMenuModal: false,
            messageModal: false,
            askQuantityModal: false,
            purchaseModal: false,
            purchaseDataModal: false,
            addedToPurchase: false,
            errorMessages: []
        }
        this.providerName = '';
        this.pendigScoredPurchases = 0
    }

    //METHODS

    componentDidMount() {
        this.setState({purchaseMaked : false});
        this.getLoggedClientId(this.state.loggedUser.email);
        this.getUserByEmail(this.state.loggedUser.email);
        this._refreshMenus();
    }

    getUserByEmail(email) {
        axios.get('http://localhost:8080/userWithEmail/' + email)
            .then((response) => {
                let user = response.data
                this.setState({
                    user: user
                }, () => {
                    axios.get('http://localhost:8080/pendingScoredPurchases/' + this.state.user.id)
                        .then(response => {
                            this.pendigScoredPurchases = response.data;
                        })
                        .catch(error => {
                            // console.log(error)
                            this.setState({errorMsg: 'Error retreiving data'})
                        })
                })
            })
    }

    toggleNewMenuModal() {
        this.setState({
            newMenuModal: !this.state.newMenuModal
        })
    }

    toggleMessageModal() {
        this.setState({
            messageModal: !this.state.messageModal
        })
    }

    toggleAskQuantityModal() {
        this.setState({
            errorMessages: [],
            askQuantityModal: !this.state.askQuantityModal
        })
    }

    togglePurchaseModal() {
        this.setState({
            purchaseModal: !this.state.purchaseModal
        })
    }

    togglePurchaseDataModal() {
        this.setState({
            purchaseDataModal: !this.state.purchaseDataModal
        })
    }

    addMenu() {
            axios.post('http://localhost:8080/menu', this.state.newMenuData)
                .then((response) => {
                    let {menus} = this.state;
                    menus.push(response.data);
                    this.setState(
                        {
                            menus,
                            newMenuModal: false,
                            number: '',
                            newMenuData: {
                                name: '',
                                description: '',
                                category: '',
                                deliveryPrice: '',
                                effectiveDateFrom: '',
                                effectiveDateTo: '',
                                dayNight: '',
                                effectiveDeliveryHoursFrom: '',
                                effectiveDeliveryHoursTo: '',
                                deliveryType: '',
                                averageDeliveryTime: '',
                                price: '',
                                maximumAllowedSells: '',
                                minimumAmount: '',
                                minimumAmountPrice: '',
                                minimumAmount2: '',
                                minimumAmount2Price: '',
                                providerId: '',
                                providerName: '',
                                score: []
                            }
                        });
                    this._refreshMenus();
                })
                .catch((error) => {
                    this.setState({
                        errorMessages: error.response.data.errors
                    })
                })
        }

    deleteMenu(id) {
        axios.delete('http://localhost:8080/menu/' + id)
            .then((response) => {
                this._refreshMenus();
            })
    }

    _refreshMenus() {
        axios.get('http://localhost:8080/menus')
            .then(response => {
                this.setState({
                    menus: response.data
                })
            })
    }

    getProviderName(id){
        axios.get('http://localhost:8080/providerName/' + id)
            .then(response => {
                this.providerName = response.data;
             })
    }


    makePurchase() {
        axios.post('http://localhost:8080/makePurchase/' + this.state.loggedClientId, this.state.purchases)
            .then((response) => {
                this.setState({
                    message: counterpart.translate('messages.successfulPurchaseMessage'),
                    purchaseMaked: true
                })
            })
            .catch((error) => {
                this.setState({
                    message: counterpart.translate('messages.failedPurchaseMessage')
                })
            })
        this.setState({
            purchases: [],
            purchaseRequest: {
                            providerId: '',
                            menuName: '',
                            quantity: '1',
                            deliveryTime: '',
                            deliveryDate: '',
                            deliveryType: ''
                            },
            messageModal: !this.state.messageModal,
            purchaseModal: !this.state.purchaseModal
        })
    }

    getPendingScoredPurchases(id){
        axios.get('http://localhost:8080/pendingScoredPurchases/' + id)
        .then(response => {
                this.pendigScoredPurchases = response.data;
        })
        .catch(error => {
            // console.log(error)
            this.setState({errorMsg: 'Error retreiving data'})
        })
    }

    askForQuantity(menuName, providerId){
        let {purchaseRequest} = this.state;
        let{addedToPurchase} = this.state;
        let{purchaseMaked} = this.state;
        let{message} = this.state;

        if(this.pendigScoredPurchases > 0 || purchaseMaked){
            message = counterpart.translate('messages.pendingScoreMessage');
            this.setState({message})
            this.toggleMessageModal();
        }
        else{
            this.state.purchases.map(p => {if(p.menuName === menuName){addedToPurchase = true}});
            if(addedToPurchase && !this.state.purchaseModal){
                this.setState({
                    message: counterpart.translate('messages.menuInPurchaseMessage'),
                    messageModal: !this.state.messageModal,
                })
            }
            else{
                purchaseRequest.providerId = providerId;
                purchaseRequest.menuName = menuName;
                purchaseRequest.quantity = '1';
                this.setState({ purchaseRequest });
                this.toggleAskQuantityModal()
            }
        }
    }

    acceptPurchaseData(){

        let {errorMessages} = this.state;
        if (this.state.purchaseRequest.quantity < 1){
           errorMessages = [];
           errorMessages.push(counterpart.translate('messages.quantityGreaterThan0Message'));
           this.setState({
               errorMessages
           });
        }
        else{
            if(!this.state.purchaseModal){
                this.addMenuToPurchase();
            }
            else{
                this.changeQuantityOfMenu();
            }
        }
    }

    addMenuToPurchase(){

        let {purchases} = this.state;
        this.state.purchases.push({ providerId: this.state.purchaseRequest.providerId,
                                    menuName: this.state.purchaseRequest.menuName,
                                    quantity: this.state.purchaseRequest.quantity });
        this.setState({
            purchases,
            errorMessages: [],
            askQuantityModal: !this.state.askQuantityModal
        })

    }

    seeMyPurchase(){
        if (this.state.purchases.length > 0){

            let {purchaseMenus} = this.state;
            let {newMenuData} = this.state;
            let {totalAmount} = this.state;
            purchaseMenus = [];
            totalAmount = 0;
            // eslint-disable-next-line array-callback-return
            this.state.purchases.map(p => {
                                            newMenuData = this.state.menus.find(menu => menu.name === p.menuName);
                                            purchaseMenus.push({
                                                                name: p.menuName,
                                                                providerName: newMenuData.providerName,
                                                                quantity: p.quantity,
                                                                price: newMenuData.price * p.quantity,
                                                                });
                                            totalAmount = totalAmount + (newMenuData.price * p.quantity);
                                          });
            this.setState({
                purchaseMenus,
                totalAmount,
                purchaseModal: !this.state.purchaseModal
            })
        }
        else{
             this.setState({
                 message: counterpart.translate('messages.noMenusInPurchaseMessage'),
                 messageModal: !this.state.messageModal
             })
        }
    }

    removeFromPurchase(menuName){

        let {purchaseMenus} = this.state;
        let {purchases} = this.state;
        let {totalAmount} = this.state;
        totalAmount = 0;
        purchases = purchases.filter(p => p.menuName !== menuName);
        purchaseMenus = purchaseMenus.filter(p => p.name !== menuName);
        purchaseMenus.map(p => totalAmount = totalAmount + p.price);
        if (purchases.length === 0){
            this.togglePurchaseModal();
        }
        this.setState({
            totalAmount,
            purchaseMenus,
            purchases
        })

    }

    changeQuantityOfMenu(){

        let {purchaseMenus} = this.state;
        let {purchases} = this.state;
        let {newMenuData} = this.state;
        let {totalAmount} = this.state;
        let {purchaseRequest} = this.state;
        totalAmount = 0;
        purchases.map(p => {if(p.menuName === purchaseRequest.menuName) {
                               p.quantity = this.state.purchaseRequest.quantity
                           }});
        purchaseMenus.map(p => {  newMenuData = this.state.menus.find(menu => menu.name === purchaseRequest.menuName);
                                  if (p.name === purchaseRequest.menuName){
                                     p.quantity = purchaseRequest.quantity;
                                     p.price = newMenuData.price * purchaseRequest.quantity;
                                }
                               });
        purchaseMenus.map(p => totalAmount = totalAmount + p.price);
        this.setState({
            totalAmount,
            purchaseMenus,
            purchases,
            askQuantityModal: !this.state.askQuantityModal
        })

    }

    setPurchaseData(){
        let {purchases} = this.state;
        let {purchaseRequest} = this.state;
        let {errorMessages} = this.state;

        purchases.map(p => { p.deliveryTime = purchaseRequest.deliveryTime;
                             p.deliveryDate = purchaseRequest.deliveryDate;
                             p.deliveryType = purchaseRequest.deliveryType; });
        this.setState({
            purchases,
            purchaseRequest: {
                            providerId: '',
                            menuName: '',
                            quantity: '1',
                            deliveryTime: '',
                            deliveryDate: '',
                            deliveryType: ''
                            },
        })
        this.togglePurchaseDataModal();
        this.makePurchase();

    }

    getLoggedClientId(email){
        axios.get('http://localhost:8080/userId/' + email)
        .then(response => {
            this.setState({
                loggedClientId: response.data
            })
            this.getPendingScoredPurchases(this.state.loggedClientId);
        })
        .catch(error => {
            // console.log(error)
            this.setState({errorMsg: 'Error retreiving data'})
        })
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
    }

    updatePrField = (field) => (ev) => {
        let {purchaseRequest} = this.state;
        purchaseRequest[field] = ev.target.value;
        this.setState({purchaseRequest})
    }

    //RENDER

    updateField = (field) => (ev) => {
        let {newMenuData} = this.state;
        newMenuData[field] = ev.target.value;
        this.setState({newMenuData})
    }

    render() {
        const {menus, purchaseMenus, errorMsg} = this.state;
        const placeholderTranslations = counterpart;
        let filteredMenus = menus.filter(
            (menu) => {
                return menu.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        let isProvider = this.state.user.type === 'provider';

        return (
            <Container>
                <Row>
                    <Col xs={10}>
                        <h1 className="my-3"><Translate content='titles.menusTitle'/></h1>
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
                        <SeePurchasesButton
                            onClick={this.seeMyPurchase.bind(this)}
                            enabled={!isProvider} />
                    </Col>
                </Row>

                {/* ADD MENU MODAL */}
                <Modal isOpen={this.state.newMenuModal} toggle={this.toggleNewMenuModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewMenuModal.bind(this)}>
                        <Translate content='titles.addMenuTitle'/>
                    </ModalHeader>
                    <ModalBody>
                        <ModalAlert errorsToShow={this.state.errorMessages} />

                        {/* ADD MENU MODAL FORM */}
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
                                    <CustomInput type="select" name="category" id="category"
                                           value={this.state.newMenuData.category}
                                           onChange={(e) => {
                                               let {newMenuData} = this.state;
                                               newMenuData.category = e.target.value;
                                               this.setState({newMenuData})
                                           }}>
                                            <option value="">
                                                {counterpart.translate('labels.chooseADayLabel')}
                                            </option>
                                            <option>PIZZA</option>
                                            <option>BEER</option>
                                     </CustomInput>
                                </Col>
                            </FormGroup>

                            {/* DAY NIGHT */}
                            <FormGroup row>
                                <Label for="dayNight" sm={10}>Dia o noche</Label>
                                <Col sm={10}>
                                    <CustomInput type="select" name="dayNight" id="dayNight"
                                           value={this.state.newMenuData.dayNight}
                                           onChange={(e) => {
                                               let {newMenuData} = this.state;
                                               newMenuData.dayNight = e.target.value;
                                               this.setState({newMenuData})
                                           }}>
                                            <option value="">
                                                {counterpart.translate('labels.chooseADayLabel')}
                                            </option>
                                            <option>DAY</option>
                                            <option>NIGHT</option>
                                     </CustomInput>
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
                        </Button>
                        <Button color="secondary" onClick={this.toggleNewMenuModal.bind(this)}>
                            <Translate content='buttons.cancelButton'/>
                        </Button>
                    </ModalFooter>
                </Modal>

                {/* MESSAGE MODAL */}
                <Modal isOpen={this.state.messageModal} toggle={this.toggleMessageModal.bind(this)}>
                    <ModalHeader toggle={this.toggleMessageModal.bind(this)}>
                        <Translate content='titles.informationTitle'/>
                    </ModalHeader>
                    <ModalBody>
                         <ModalAlert errorsToShow={this.state.errorMessages} />

                         {/* MESSAGE FORM */}
                         <Form>
                             {/* MESSAGE */}
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

                         {/* ASK QUANTITY MODAL FORM */}
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
                        <Translate content='titles.myPurchaseTitle'/>
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
                                         <th><Translate content='labels.providerLabel'/></th>
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
                                             <td>{menu.providerName}</td>
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
                                <th><Translate content='labels.providerLabel'/></th>
                                {!isProvider && <th><Translate content='labels.actionsLabel'/></th>}
                            </tr>
                            </thead>

                            {/* MENU INFO FETCHED FROM SERVER */}
                            <tbody>
                            { filteredMenus.map(menu =>
                                <tr key={menu.id}>
                                    <th hidden scope="row">{menu.id}</th>
                                    <td>{menu.name}</td>
                                    <td>{menu.description}</td>
                                    <td>{menu.category}</td>
                                    <td>{menu.price}</td>
                                    <td>{menu.providerName}</td>
                                    {!isProvider && <td>
                                        <Button color='warning' size='sm'
                                                onClick={this.askForQuantity.bind(this, menu.name, menu.providerId)}>
                                            <Translate content='buttons.addMenuButton'/>
                                        </Button>
                                    </td>}
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

export default Menus