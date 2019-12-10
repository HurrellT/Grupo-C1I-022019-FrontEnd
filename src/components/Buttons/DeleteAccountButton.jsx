import {Button} from "reactstrap";
import Translate from "react-translate-component";
import React from "react";

function DeleteAccountButton(props) {
    const enabled = props.enabled;
    const onClickFunction = props.onClick;
    const owner = props.owner;

    if (enabled && owner) {
        return (
            <Button color='danger' size='sm'
                    onClick={onClickFunction}>
                <Translate content='buttons.deleteButton'/>
            </Button>
        )
    }
    else {
        return <div/>
    }
}

export default DeleteAccountButton