import React,{Component} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {nodeActions} from '../../_actions'
import { connect } from 'react-redux';

class EditNodeModal extends Component {
  
    state = {
        nodeName: this.props.nodeName
    }

    handleChange({target}) {
        this.setState({nodeName: target.value})
    }
    editNode() {
        const {editNode} = this.props
        editNode(this.props.nodeId, this.state.nodeName)
        this.hideAndClearName()
    }
    hideAndClearName() {
        this.props.onHide()
        this.setState({nodeName:''})
    }

    render() {
    return (
        <Modal
            onHide={() => this.hideAndClearName()}
            show={this.props.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edytuj nazwę
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control 
                value={this.state.nodeName}
                onChange={(event) => this.handleChange(event)}
                type="text"
                placeholder="Nazwa" />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => this.editNode()} variant="success">Edytuj</Button>
            <Button onClick={() => this.hideAndClearName()}>Zamknij</Button>
        </Modal.Footer>
        </Modal>
    );
    }
}

function mapState(state){
    
  return state;
}
const actionCreators = {
  editNode: nodeActions.editNode,

}

const connectedApp = connect(mapState, actionCreators)(EditNodeModal)
export {connectedApp as EditNodeModal}
