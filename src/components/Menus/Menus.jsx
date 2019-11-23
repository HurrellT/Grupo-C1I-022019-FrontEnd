import React from 'react'
import axios from 'axios'
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Alert, CustomInput} from 'reactstrap';
import Label from "reactstrap/es/Label";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import counterpart from 'counterpart';
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

class Menus extends React.Component {

    constructor(props) {
        super(props)

        this.providerName = '';
        this.state = {
            menus: [],
            menuNames: [],
            purchases: [],
            purchaseMenus: [],
            totalAmount: 0,
            search: '',
            purchaseRequest: {
                providerId: '',
                menuName: '',
                quantity: '1'
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
            message: '',
            newMenuModal: false,
            editMenuModal: false,
            messageModal: false,
            askQuantityModal: false,
            purchaseModal: false,
            addedToPurchase: false,
            errorMessages: []
        }
    }

    //METHODS

    componentDidMount() {
        this._refreshMenus();
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
            .catch(error => {
                // console.log(error)
                this.setState({errorMsg: 'Error retreiving data'})
            })
    }

    getProviderName(id){
        axios.get('http://localhost:8080/providerName/' + id)
            .then(response => {
                this.providerName = response.data;
             })
            .catch(error => {
                //console.log(error)
                this.setState({errorMsg: 'Error retreiving data'})
            })
    }


    makePurchase() {
        //TODO: change the 4 fot the logged client id
        axios.post('http://localhost:8080/makePurchase/' + 4, this.state.purchases)
            .then((response) => {
                this.setState({
                    message: 'Su compra ha sido realizada con éxito'
                })
            })
            .catch((error) => {
                this.setState({
                    message: 'No se pudo realizar la compra'
                })
            })
        this.setState({
            purchases: [],
            purchaseRequest: {
                            providerId: '',
                            menuName: '',
                            quantity: '1'
                            },
            messageModal: !this.state.messageModal,
            purchaseModal: !this.state.purchaseModal
        })
    }

    askForQuantity(menuName, providerId){
        let {purchaseRequest} = this.state;
        let{addedToPurchase} = this.state;

        this.state.purchases.map(p => {if(p.menuName === menuName){addedToPurchase = true}});
        if(addedToPurchase){
            this.setState({
                message: 'Este menú ya está en la compra',
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

    acceptAskQuantityModal(){
        let {purchases} = this.state;
        let {errorMessages} = this.state;

        if (this.state.purchaseRequest.quantity < 1){
           errorMessages = [];
           errorMessages.push("La cantidad debe ser mayor a 0");
           this.setState({
               errorMessages
           });
        }
        else{
            this.state.purchases.push({ providerId: this.state.purchaseRequest.providerId,
                                        menuName: this.state.purchaseRequest.menuName,
                                        quantity: this.state.purchaseRequest.quantity });
            this.setState({
                purchases,
                errorMessages: [],
                askQuantityModal: !this.state.askQuantityModal
            })
        }
    }

    seeMyPurchase(){
        if (this.state.purchases.length > 0){

            let {purchaseMenus} = this.state;
            let {newMenuData} = this.state;
            let {totalAmount} = this.state;
            purchaseMenus = [];
            totalAmount = 0;
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
                 message: 'Aún no hay menús en su compra',
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

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
    }

    //RENDER

    updateField = (field) => (ev) => {
        let {newMenuData} = this.state;
        newMenuData[field] = ev.target.value;
        this.setState({newMenuData})
    }

    render() {
        const {menus, purchaseMenus, errorMsg} = this.state;
        let filteredMenus = menus.filter(
            (menu) => {
                return menu.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return (
            <Container>
                <Row>
                    <Col xs={10}>
                        <h1 className="my-3">Menús</h1>
                    </Col>
                    <Col xs={8} className="my-3">
                        <Label for="search" sm={3} style={{width: 300, padding: 19}} ><b>Filtrar por nombre:</b></Label>
                        <input type = "text"
                               style={{width: 300}}
                               placeholder = "Escriba un nombre de menú"
                               value = {this.state.search}
                               onChange = {this.updateSearch.bind(this)}/>
                    </Col>
                    <Col xs={2} className="my-3">
                        <Button className="my-3" color="primary" onClick={this.toggleNewMenuModal.bind(this)}>
                            Nuevo Menú
                        </Button>
                    </Col>
                    <Col xs={2} className="my-3">
                        <Button className="my-3" color="primary" onClick={this.seeMyPurchase.bind(this)}>
                            Ver mi compra
                        </Button>
                    </Col>
                </Row>

                {/* ADD MENU MODAL */}
                <Modal isOpen={this.state.newMenuModal} toggle={this.toggleNewMenuModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewMenuModal.bind(this)}>
                        Añadir un nuevo Menú
                    </ModalHeader>
                    <ModalBody>
                        <ModalAlert errorsToShow={this.state.errorMessages} />

                        {/* ADD MENU MODAL FORM */}
                        <Form>
                            {/* NAME */}
                            <FormGroup row>
                                <Label for="name" sm={10}>Nombre</Label>
                                <Col sm={10}>
                                    <Input name="name" id="name" placeholder="Escriba el nombre del menú"
                                           value={this.state.newMenuData.name}
                                           onChange={this.updateField('name')}/>
                                </Col>
                            </FormGroup>

                            {/* DESCRIPTION */}
                            <FormGroup row>
                                <Label for="description" sm={10}>Descripción</Label>
                                <Col sm={10}>
                                    <Input name="description" id="description" placeholder="Escriba la descripción del menú"
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
                                <Label for="category" sm={10}>Categoría</Label>
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
                                <Label for="deliveryPrice" sm={10}>Precio de delivery</Label>
                                <Col sm={10}>
                                    <Input type="deliveryPrice" name="deliveryPrice" id="deliveryPrice" placeholder="Escriba el precio de delivery"
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
                            Agregar Menú
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewMenuModal.bind(this)}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>

                {/* MESSAGE MODAL */}
                <Modal isOpen={this.state.messageModal} toggle={this.toggleMessageModal.bind(this)}>
                    <ModalHeader toggle={this.toggleMessageModal.bind(this)}>
                        Información
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
                             Aceptar
                         </Button>
                     </ModalFooter>

                </Modal>


                {/* ASK QUANTITY MODAL */}
                <Modal isOpen={this.state.askQuantityModal} toggle={this.toggleAskQuantityModal.bind(this)}>
                    <ModalHeader toggle={this.toggleAskQuantityModal.bind(this)}>
                        Seleccionar la cantidad
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
                         <Button color="primary" onClick={this.acceptAskQuantityModal.bind(this)}>
                             Aceptar
                         </Button>
                         <Button color="secondary" onClick={this.toggleAskQuantityModal.bind(this)}>
                             Cancelar
                         </Button>
                     </ModalFooter>
                </Modal>

                {/* PURCHASE MODAL */}
                <Modal isOpen={this.state.purchaseModal} toggle={this.togglePurchaseModal.bind(this)}
                       style={{width: 3000}}>
                    <ModalHeader toggle={this.togglePurchaseModal.bind(this)}>
                        Mi compra
                    </ModalHeader>
                    <ModalBody>
                         <ModalAlert errorsToShow={this.state.errorMessages} />

                         <Row>
                             <Col>
                                 <Table hover responsive>
                                     <thead>
                                     <tr>
                                         <th hidden>#</th>
                                         <th>Nombre</th>
                                         <th>Proveedor</th>
                                         <th>Cantidad</th>
                                         <th>Precio</th>
                                         <th>Acciones</th>
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
                                                 <Button color='danger' size='sm'
                                                         onClick={this.removeFromPurchase.bind(this, menu.name)}>
                                                     Quitar de la compra
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
                         <Button color="primary" onClick={this.makePurchase.bind(this)}>
                             Realizar la compra
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
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Proveedor</th>
                                <th>Acciones</th>
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
                                    <td>
                                        <Button color='warning' size='sm'
                                                onClick={this.askForQuantity.bind(this, menu.name, menu.providerId)}>
                                            Agregar a mi compra
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

export default Menus