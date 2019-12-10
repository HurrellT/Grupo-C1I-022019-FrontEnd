import {Button, Col} from "reactstrap";
import Translate from "react-translate-component";
import React from "react";

function AddProviderButton(props) {
    const enabled = props.enabled
    const onClickFunction = props.onClick

    if (enabled) {
        return (
            <Col xs={2} className="my-3">
                <Button className="my-3" color="primary" onClick={onClickFunction}>
                    <Translate content='buttons.newProviderButton'/>
                </Button>
            </Col>)
    } else {
        return <div/>
    }
}

export default AddProviderButton