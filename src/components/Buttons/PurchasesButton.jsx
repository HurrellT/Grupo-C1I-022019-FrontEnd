import React from "react";
import {Button} from "reactstrap";
import Translate from "react-translate-component";

function PurchasesButton(props) {
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

export default PurchasesButton