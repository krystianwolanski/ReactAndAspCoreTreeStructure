import React,{Component} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {nodeActions} from '../../_actions'
import { connect } from 'react-redux';

class AddNodeModal extends Component {

  state = {
    nameNode: ''
  }

  handleChange({target}) {
    this.setState({nameNode: target.value})
  }
  addNode(parentNodeId) {
    this.props.addNode(this.state.nameNode, parentNodeId)
    this.hideAndClearName()
  }
  hideAndClearName() {
    this.props.onHide()
    this.setState({nameNode:''})
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
            Dodaj węzeł
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control value={this.state.nameNode} onChange={(event) => this.handleChange(event)} type="text" placeholder="Nazwa" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.addNode(this.props.parentNodeId)} variant="success">Dodaj</Button>
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
  addNode: nodeActions.addNode
}

const connectedApp = connect(mapState, actionCreators)(AddNodeModal)
export {connectedApp as AddNodeModal}
