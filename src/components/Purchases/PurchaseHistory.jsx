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

class PurchaseHistory extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            purchases: [],
            order: [],
            purchaseScore: {
                id: '',
                score: '1'
            },
            message: '',
            seeMenusModal: false,
            setScoreModal: false,
            errorMessages: []
        }
    }

    //METHODS

    componentDidMount() {
        let {clientId} = this.props.match.params;
        this._refreshPurchases(clientId);
    }

    toggleSeeMenusModal() {
        this.setState({
            seeMenusModal: !this.state.seeMenusModal
        })
    }

    toggleSetScoreModal() {
        this.setState({
            setScoreModal: !this.state.setScoreModal
        })
    }

    _refreshPurchases(clientId) {
        axios.get('http://localhost:8080/cpurchases/' + 4)
            .then(response => {
                this.setState({
                    purchases: response.data
                })
            })
            .catch(error => {
                // console.log(error)
                this.setState({errorMsg: 'Error retreiving data'})
            })
    }

    seePurchaseMenus(order){
        this.setState({
            order: order,
            seeMenusModal: !this.state.seeMenusModal
        })
    }

    setScore(id){
        let{purchaseScore} = this.state;
        purchaseScore.id = id;
        this.setState({
            purchaseScore,
            setScoreModal: !this.state.setScoreModal
            })
    }

    acceptScore(){
        axios.post('http://localhost:8080/setScore', this.state.purchaseScore)
            .then((response) => {
                this.setState({
                    message: counterpart.translate('messages.successfulPurchaseMessage')
                })
            })
            .catch((error) => {
                this.setState({
                    message: counterpart.translate('messages.failedPurchaseMessage')
                })
            })
        this._refreshPurchases();
        this.toggleSetScoreModal();
    }

    //RENDER
    render() {
        const {purchases, order} = this.state;

        return (
            <Container>
                <Row>
                    <Col xs={10}>
                        <h1 className="my-3"><Translate content='titles.purchaseHistoryTitle'/></h1>
                    </Col>
                </Row>

                {/* SEE MENUS MODAL */}
                <Modal isOpen={this.state.seeMenusModal} toggle={this.toggleSeeMenusModal.bind(this)}
                       style={{width: 3000}}>
                    <ModalHeader toggle={this.toggleSeeMenusModal.bind(this)}>
                        Menús de la compra
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
                                         <th><Translate content='labels.unitPriceLabel'/></th>
                                     </tr>
                                     </thead>

                                     {/* PURCHASE INFO FETCHED FROM SERVER */}
                                     <tbody>
                                     { order.map(menu =>
                                         <tr key={menu.id}>
                                             <td>{menu.menuName}</td>
                                             <td>{menu.menu.providerName}</td>
                                             <td>{menu.quantity}</td>
                                             <td>{menu.menu.price}</td>
                                         </tr>
                                     )}
                                     </tbody>
                                 </Table>
                             </Col>
                         </Row>
                    </ModalBody>
                </Modal>

                {/* SET SCORE MODAL */}
                <Modal isOpen={this.state.setScoreModal} toggle={this.toggleSetScoreModal.bind(this)}>
                    <ModalHeader toggle={this.toggleSetScoreModal.bind(this)}>
                        Seleccionar puntaje
                    </ModalHeader>
                    <ModalBody>
                         <ModalAlert errorsToShow={this.state.errorMessages} />

                         {/* ASK QUANTITY MODAL FORM */}
                         <Form>
                             {/* QUANTITY */}
                             <FormGroup row>
                                 <Col sm={10}>
                                     <NumericInput min={1} max = {5} value={this.state.purchaseScore.score}
                                        onChange={(value) =>{
                                            let {purchaseScore} = this.state;
                                            purchaseScore.score = value;
                                            this.setState({purchaseScore})
                                     }}/>
                                 </Col>
                             </FormGroup>
                         </Form>

                     </ModalBody>
                     <ModalFooter>
                         <Button color="primary" onClick={this.acceptScore.bind(this)}>
                             Aceptar
                         </Button>
                         <Button color="secondary" onClick={this.toggleSetScoreModal.bind(this)}>
                             Cancelar
                         </Button>
                     </ModalFooter>
                </Modal>

                {/* PURCHASE CRUD TABLE */}
                <Row>
                    <Col>
                        <Table hover responsive>
                            <thead>
                            <tr>
                                <th hidden>#</th>
                                <th>Fecha de pedido</th>
                                <th>Valor</th>
                                <th>Proveedor</th>
                                <th>Puntuación</th>
                                <th>Fecha de entrega</th>
                                <th>Hora de entrega</th>
                                <th>Tipo de entrega</th>
                                <th>Menús</th>
                                <th>Puntuar</th>
                            </tr>
                            </thead>

                            {/* MENU INFO FETCHED FROM SERVER */}
                            <tbody>
                            { purchases.map(purchase =>
                                <tr key={purchase.id}>
                                    <th hidden scope="row">{purchase.id}</th>
                                    <td>{purchase.orderDate}</td>
                                    <td>{purchase.totalAmount}</td>
                                    <td>{purchase.order[0].menu.providerName}</td>
                                    <td>{purchase.score}</td>
                                    <td>{purchase.deliveryDate}</td>
                                    <td>{purchase.deliveryTime}</td>
                                    <td>{purchase.deliveryType}</td>
                                    <td>
                                        <Button color='primary' size='sm'
                                                onClick={this.seePurchaseMenus.bind(this, purchase.order)}>
                                            Ver menús de la compra
                                        </Button>
                                    </td>
                                    <td>
                                        <Button color='warning' size='sm'
                                                onClick={this.setScore.bind(this, purchase.id)}>
                                            Puntuar
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

export default PurchaseHistory