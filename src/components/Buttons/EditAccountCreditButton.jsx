import {Button} from "reactstrap";
import Translate from "react-translate-component";
import React from "react";

function EditAccountCreditButton(props) {
    const enabled = props.enabled;
    const onClickFunction = props.onClick;
    const owner = props.owner;

    if (enabled && owner) {
        return (
            <Button color='primary' size='sm' className='mr-2'
                    onClick={onClickFunction}>
                <Translate content='buttons.accountCreditButton'/>
            </Button>)
    } else {
        return <div/>
    }
}
export default EditAccountCreditButton