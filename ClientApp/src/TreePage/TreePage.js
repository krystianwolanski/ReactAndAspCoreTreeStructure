import React, { Component } from 'react'
import {treeActions} from '../_actions'
import { connect } from 'react-redux';
import Node from './Node/Node'
import './style.css'
import ContextMenu from './ContextMenu'
import {AddNodeModal} from './Modals/AddNodeModal'
import { EditNodeModal } from './Modals/EditNodeModal';

class TreePage extends Component {

    state = {
        activeNode: 0,
        activeNodeName: '',
        showContextMenu: false,
        top:0,
        left:0,
        showAddNodeModal: false,
        showEditNodeModal: false
      }
    
    componentDidMount(){
      //document.addEventListener('click', this.hideContextMenu.bind(this))
      this.props.getTree()
    }
    componentWillUnmount(){
      //document.removeEventListener('click',this.hideContextMenu.bind(this))
    }
    hideContextMenu(){
      this.setState({showContextMenu: false})
    }
    setActiveNode(id) {   
        this.setState({activeNode: id})
    }
    handleOnContextMenu(event, id, name){
        event.preventDefault()
        
        this.setState({activeNode: id, activeNodeName: name, showContextMenu: true, left: event.clientX, top: event.clientY})   
    }
    toggleShowAddNodeModal() {
      this.setState({showAddNodeModal: !this.state.showAddNodeModal})
    }
    toggleShowEditNodeModal() {
      this.setState({showEditNodeModal: !this.state.showEditNodeModal})
    }

    renderSubNodes(subNodes) {
        const {activeNode} = this.state
        return (
          <ul>
            {subNodes.map((node) => (
                <React.Fragment>
                    <li>
                        <div onContextMenu={(event) => this.handleOnContextMenu(event, node.nodeId, node.name)} className={activeNode===node.nodeId?"bgSelected":""} key={node.nodeId} onClick={() => this.setActiveNode(node.nodeId)}>
                            <Node name={node.name}/>
                        </div>
                        {node.subNodes.length > 0 && this.renderSubNodes(node.subNodes)}
                    </li>
                </React.Fragment>
            ))}
          </ul>
        );
      }

    render() {
        const tree2 = this.props.tree.items;
        
        return(
            <React.Fragment>
                {tree2 && this.renderSubNodes(tree2)}
                {this.state.showContextMenu? <ContextMenu  showAddNodeModal={() => this.toggleShowAddNodeModal()} showEditNodeModal={() => this.toggleShowEditNodeModal()} left={this.state.left} top={this.state.top}/>:''}
                
                <AddNodeModal
                  show={this.state.showAddNodeModal} 
                  onHide={() => this.toggleShowAddNodeModal()}
                  parentNodeId={this.state.activeNode}
                />

                <EditNodeModal
                  show={this.state.showEditNodeModal}
                  onHide={() => this.toggleShowEditNodeModal()}
                  nodeId={this.state.activeNode}
                  nodeName={this.state.activeNodeName}
                />
            </React.Fragment>
        )
    }
}
function mapState(state){
    

    return state;
}
const actionCreators = {
    getTree: treeActions.getTree
}

const connectedApp = connect(mapState, actionCreators)(TreePage)
export {connectedApp as TreePage}