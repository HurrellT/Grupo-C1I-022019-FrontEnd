import React from "react"
import {Alert} from "reactstrap";
import Translate from "react-translate-component";

function ModalAlert({errorsToShow}) {
    const hasErrorsToShow = errorsToShow.length > 0

    if (hasErrorsToShow) {
        return (
            <Alert color="danger">
                {errorsToShow.map(error => <div>{
                    <Translate content={error} />
                }</div>)}
            </Alert>
        )
    }
    return <div/>
}

export default ModalAlert