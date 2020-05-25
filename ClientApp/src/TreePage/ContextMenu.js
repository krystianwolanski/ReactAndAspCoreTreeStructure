import React from 'react'
import {MyVerticallyCenteredModal} from './MyVerticallyCenteredModal'

function ContextMenu({left, top}){

    const [modalShow, setModalShow] = React.useState(false);

    return(
        <React.Fragment>
            <ul className="contextMenu" style={{left: left, top: top}}>
                <li onClick={() => setModalShow(true)}>Add Node</li>
                <li>Edit Node</li>
            </ul>

            <MyVerticallyCenteredModal 
                show={modalShow}
                onHide={() => setModalShow(false)}/>
        </React.Fragment>
        
    )
}

export default ContextMenu
