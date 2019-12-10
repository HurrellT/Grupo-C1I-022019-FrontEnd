import {Button} from "reactstrap";
import Translate from "react-translate-component";
import React from "react";

function EditAccountButton(props) {
    const enabled = props.enabled;
    const onClickFunction = props.onClick;
    const owner = props.owner;

    if (enabled && owner) {
        return (
            <Button color='success' size='sm' className='mr-2'
                    onClick={onClickFunction}>
                <Translate content='buttons.editButton'/>
            </Button>
        )
    }
    else {
        return <div/>
    }
}

export default EditAccountButton