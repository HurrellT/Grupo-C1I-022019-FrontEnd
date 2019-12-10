import React from "react";
import {Button} from "reactstrap";
import Translate from "react-translate-component";

function AddMenuButton(props) {
    const enabled = props.enabled;
    const onClickFunction = props.onClick;
    const owner = props.owner;

    if (enabled && owner) {
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
export default AddMenuButton