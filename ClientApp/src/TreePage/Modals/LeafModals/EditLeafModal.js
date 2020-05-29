import React,{Component} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {leafActions} from '../../../_actions'
import { connect } from 'react-redux';

class EditLeafModal extends Component {
  
    state = {
        leafName: this.props.leafName
    }

    handleChange({target}) {
        this.setState({leafName: target.value})
    }
    editLeaf() {
        if(this.state.leafName){
            this.props.editLeaf(this.props.leafId, this.state.leafName)
        }
        
        this.hideAndClearName()
    }
    hideAndClearName() {
        this.props.onHide()
        this.setState({leafName:''})
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
                Edit name
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control 
                value={this.state.leafName}
                onChange={(event) => this.handleChange(event)}
                type="text"
                placeholder="Name" />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => this.editLeaf()} variant="success">Edit</Button>
            <Button onClick={() => this.hideAndClearName()}>Close</Button>
        </Modal.Footer>
        </Modal>
    );
    }
}

function mapState(state){
    
  return state;
}
const actionCreators = {
  editLeaf: leafActions.editLeaf,

}

const connectedApp = connect(mapState, actionCreators)(EditLeafModal)
export {connectedApp as EditLeafModal}
