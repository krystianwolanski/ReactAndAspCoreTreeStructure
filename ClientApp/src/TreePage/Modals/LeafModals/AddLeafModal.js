import React,{Component} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {leafActions} from '../../../_actions'
import { connect } from 'react-redux';

class AddLeafModal extends Component {

  state = {
    leafName: ''
  }

  handleChange({target}) {
    this.setState({leafName: target.value})
  }
  addLeaf(parentNodeId) {
    this.props.addLeaf(this.state.leafName, parentNodeId)
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
            Add leaf
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control value={this.state.leafName} onChange={(event) => this.handleChange(event)} type="text" placeholder="Name" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.addLeaf(this.props.parentNodeId)} variant="success">Add</Button>
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
  addLeaf: leafActions.addLeaf
}

const connectedApp = connect(mapState, actionCreators)(AddLeafModal)
export {connectedApp as AddLeafModal}
