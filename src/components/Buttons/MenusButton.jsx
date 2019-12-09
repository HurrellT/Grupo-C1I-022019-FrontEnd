import React from "react";
import {Button} from "reactstrap";
import { useHistory } from "react-router-dom";
import Translate from "react-translate-component";

function MenusButton(props) {

    const providerId = props.userId;
    const clientId = props.clientId;

    let history = useHistory();

    function handleClick() {
        history.push('/providerMenus/' + providerId + '/' + clientId);
    }

    return (
        <Button color='warning' size='sm'
                onClick={handleClick}>
            <Translate content="buttons.viewMenus"/>
        </Button>
    )
}

export default MenusButton