import React,{Component} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

export class DeleteNodeModal extends Component {

    render() {
        return (
            <Modal
                onHide={() => this.props.onHide()}
                show={this.props.show}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                Nie możesz usunąć węzła, bo zawiera inne węzły. 
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => this.props.onHide()}>Zamknij</Button>
            </Modal.Footer>
            </Modal>
        );
    }
}
