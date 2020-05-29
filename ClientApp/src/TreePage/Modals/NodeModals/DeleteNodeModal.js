import React,{Component} from 'react'
import {Modal, Button} from 'react-bootstrap'

export class DeleteNodeModal extends Component {

    render() {
        return (
            <Modal
                onHide={() => this.props.onHide()}
                show={this.props.show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                The node cannot be deleted because it contains subnodes or subleaves
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.props.onHide()}>Close</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}
