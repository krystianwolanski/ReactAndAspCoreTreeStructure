import React, { Component } from 'react'
import {treeActions} from '../_actions'
import { connect } from 'react-redux';
import './style.css'
import ContextMenu from './ContextMenu'
import {AddNodeModal, EditNodeModal, DeleteNodeModal} from './Modals'
import {Container} from 'react-bootstrap'

class TreePage extends Component {

    state = {
        hidelistItemsId: [],
        selectedItem: '',
        selectedItemId: 0,
        activeNodeName: '',
        showContextMenu: false,
        top:0,
        left:0,
        showAddNodeModal: false,
        showEditNodeModal: false,
        showDeleteNodeModal: false
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
    handleOnContextMenu(event, selectedItemId, name, selectedItem){
        event.preventDefault()
        
        this.setState({
          selectedItemId: selectedItemId,
          selectedItem: selectedItem,
          activeNodeName: name,
          showContextMenu: true, 
          left: event.clientX, 
          top: event.clientY})   
    }
    toggleShowAddNodeModal() {
      this.setState({showAddNodeModal: !this.state.showAddNodeModal})
    }
    toggleShowEditNodeModal() {
      this.setState({showEditNodeModal: !this.state.showEditNodeModal})
    }
    toggleShowDeleteNodeModal() {
      this.setState({showDeleteNodeModal: !this.state.showDeleteNodeModal})
    }
    toggleHideListItemsId(nodeId) {
      const {hidelistItemsId} = this.state
      
      if(hidelistItemsId.includes(nodeId)) {
        const index = hidelistItemsId.indexOf(nodeId)

        if(index > -1) {
          hidelistItemsId.splice(index,1)
        }
      }
      else{
        this.setState({hidelistItemsId: [...hidelistItemsId, nodeId]})
      }
    }

    renderSubNodes(subNodes) {
        return (
          <React.Fragment >
            {subNodes.map((node) => (
                <ul>
                  <li className = {this.state.hidelistItemsId.includes(node.nodeId) ? "hide":""} key={node.Id}>
                      <div 
                        onContextMenu={(event) => this.handleOnContextMenu(event, node.nodeId, node.name, "n"+node.nodeId)}
                        className={this.state.selectedItem === "n"+node.nodeId ? "bgSelected":""}
                        onClick={() => {
                          this.setState({
                            selectedItem: "n"+node.nodeId,
                            selectedItemId: node.nodeId,
                            })

                            if(node.subNodes.length > 0){
                              this.toggleHideListItemsId(node.nodeId)
                            }
                            
                        }}>
                      
                        <i className={this.state.hidelistItemsId.includes(node.nodeId) || node.subNodes.length <= 0? "arrow right":"arrow down"}></i>  
                        <span className="listItem">{node.name}</span>

                      </div>
                      {node.subNodes.length > 0 && this.renderSubNodes(node.subNodes)}
                      
                      {node.subLeaves.length > 0 && 
                        <ul>
                          {node.subLeaves.map((leaf) => (
                            <li>
                              <div
                                className = {this.state.selectedItem === "l"+leaf.leafId ? "bgSelected":""}
                                onClick = {() => this.setState({selectedItem: "l"+leaf.leafId, selectedItemId: leaf.leafId})}
                              >
                                {leaf.name}
                              </div>
                            </li>
                          ))}
                        </ul>
                      }
                  </li>
                </ul>
            ))}
          </React.Fragment>
        );
      }

    render() {
        const tree2 = this.props.tree.items;

        return(
            <Container>
                {tree2 && this.renderSubNodes(tree2)}
                
                {
                  this.state.showContextMenu? 
                    <ContextMenu  
                      showAddNodeModal={() => this.toggleShowAddNodeModal()}
                      showEditNodeModal={() => this.toggleShowEditNodeModal()}
                      showDeleteNodeModal={() => this.toggleShowDeleteNodeModal()}
                      left={this.state.left}
                      top={this.state.top}/>
                  :''
                }
                
                
                <AddNodeModal
                  show={this.state.showAddNodeModal} 
                  onHide={() => this.toggleShowAddNodeModal()}
                  parentNodeId={this.state.selectedItemId}
                />

                {this.state.showEditNodeModal && <EditNodeModal
                  show={this.state.showEditNodeModal}
                  onHide={() => this.toggleShowEditNodeModal()}
                  nodeId={this.state.selectedItemId}
                  nodeName={this.state.activeNodeName}
                />}
                <DeleteNodeModal
                  show={this.state.showDeleteNodeModal}
                  onHide={() => this.toggleShowDeleteNodeModal()}
                />
            </Container>
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