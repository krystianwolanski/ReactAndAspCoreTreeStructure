import React, { Component } from 'react'
import {treeActions, leafActions, nodeActions} from '../_actions'
import { connect } from 'react-redux';
import './style.css'
import {NodeContextMenu, LeafContextMenu} from './ContextMenus'
import {AddNodeModal, EditNodeModal, DeleteNodeModal} from './Modals/NodeModals'
import {AddLeafModal, EditLeafModal} from './Modals/LeafModals'
import {Container} from 'react-bootstrap'

class TreePage extends Component {

    state = {
        hidelistItemsId: [],
        selectedItem: '',
        selectedItemId: 0,
        activeNodeName: '',
        showNodeContextMenu: false,
        showLeafContextMenu: false,
        top:0,
        left:0,
        
        showAddNodeModal: false,
        showEditNodeModal: false,
        showDeleteNodeModal: false,

        showAddLeafModal: false,
        showEditLeafModal: false
      }
    
    componentDidMount(){
      //this.props.getTree()
      document.addEventListener('click', this.hideContextMenu.bind(this))
      
    }
    componentWillUnmount(){
      document.removeEventListener('click',this.hideContextMenu.bind(this))
    }
    hideContextMenu(){
      this.setState({showNodeContextMenu: false,showLeafContextMenu: false })
    }
    setActiveNode(id) {   
        this.setState({activeNode: id})
    }
    handleOnContextMenu(event, selectedItemId, name, selectedItem, contextMenu){
        event.preventDefault()
        
        let menuContext;
        if(contextMenu === 'showNodeContextMenu') {
          menuContext = {showNodeContextMenu: true, showLeafContextMenu: false}
        }
        else {
          menuContext = {showNodeContextMenu: false, showLeafContextMenu: true}
        }
          
        this.setState({
          selectedItemId: selectedItemId,
          selectedItem: selectedItem,
          activeNodeName: name,
          ...menuContext, 
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
    toggleShowAddLeafModal() {
      this.setState({showAddLeafModal: !this.state.showAddLeafModal})
    }
    toggleShowEditLeafModal() {
      this.setState({showEditLeafModal: !this.state.showEditLeafModal})
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
    deleteLeaf(leafId) {
      this.props.deleteLeaf(leafId)
    }
    sort(nodeId) {
      this.props.sortNode(nodeId)
    }
    renderSubNodes(subNodes) {
        return (
          <React.Fragment >
            {subNodes.map((node) => (
                <ul>
                  <li className = {this.state.hidelistItemsId.includes(node.nodeId) ? "hide":""} key={node.Id}>
                      <div 
                        onContextMenu={(event) => this.handleOnContextMenu(event, node.nodeId, node.name, "n"+node.nodeId,'showNodeContextMenu')}
                        className={this.state.selectedItem === "n"+node.nodeId ? "bgSelected":""}
                        onClick={() => {
                          this.setState({
                            selectedItem: "n"+node.nodeId,
                            selectedItemId: node.nodeId,
                            })

                            if(node.subNodes.length > 0 || node.subLeaves.length > 0){
                              this.toggleHideListItemsId(node.nodeId)
                            }
                            
                        }}>
                      
                        <i className={this.state.hidelistItemsId.includes(node.nodeId) || (node.subNodes.length <= 0 && node.subLeaves.length <= 0)? "arrow right":"arrow down"}></i>  
                        <span className="listItem">{node.name}</span>

                      </div>
                      {node.subNodes.length > 0 && this.renderSubNodes(node.subNodes)}
                      
                      {node.subLeaves.length > 0 && 
                        <ul>
                          {node.subLeaves.map((leaf) => (
                            <li>
                              <div
                                onContextMenu={(event) => this.handleOnContextMenu(event, leaf.leafId, leaf.name, "l"+leaf.leafId, 'showLeafContextMenu')}
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
        const tree2 = this.props.tree.items
        
        const tree = [
          {
            nodeId: 1,
            name: "node1",
            subNodes: [
              {
                nodeId: 4,
                name: "node1-1",
                subNodes: [],
                subLeaves: []
              },
              {
                nodeId: 5,
                name: "node1-2",
                subNodes: [],
                subLeaves: []
              }
            ],
            subLeaves: []
          },
          {
            nodeId: 2,
            name: "node2",
            subNodes: [],
            subLeaves: []
          },
          {
            nodeId: 3,
            name: "node3",
            subNodes: [
              {
                nodeId: 6,
                name: "node3-1",
                subNodes: [
                  {
                    nodeId: 7,
                    name: "node3-1-1",
                    subNodes: [],
                    subLeaves: []
                  },
                  {
                    nodeId: 8,
                    name: "node3-1-2",
                    subNodes: [],
                    subLeaves: []
                  }
                ],
                subLeaves: []
              },
              {
                nodeId: 9,
                name: "node3-2",
                subNodes: [],
                subLeaves: []
              }
            ],
            subLeaves: []
          }
        ];
        return(
          
            <Container>
                {this.renderSubNodes(tree)}
                
                {
                  this.state.showNodeContextMenu &&
                    <NodeContextMenu  
                      showAddNodeModal={() => this.toggleShowAddNodeModal()}
                      showEditNodeModal={() => this.toggleShowEditNodeModal()}
                      showDeleteNodeModal={() => this.toggleShowDeleteNodeModal()}
                      showAddLeafModal={() => this.toggleShowAddLeafModal()}
                      sort={() => this.sort(this.state.selectedItemId)}
                      left={this.state.left}
                      top={this.state.top}
                    />
                }

                {
                  this.state.showLeafContextMenu &&
                    <LeafContextMenu
                      showEditLeafModal = {() => this.toggleShowEditLeafModal()}
                      deleteLeaf={() => this.deleteLeaf(this.state.selectedItemId)}
                      left = {this.state.left}
                      top = {this.state.top}
                    />
                }
                
                
                <AddNodeModal
                  show={this.state.showAddNodeModal} 
                  onHide={() => this.toggleShowAddNodeModal()}
                  parentNodeId={this.state.selectedItemId}
                />

                {this.state.showEditNodeModal && 
                <EditNodeModal
                  show={this.state.showEditNodeModal}
                  onHide={() => this.toggleShowEditNodeModal()}
                  nodeId={this.state.selectedItemId}
                  nodeName={this.state.activeNodeName}
                />}
                <DeleteNodeModal
                  show={this.state.showDeleteNodeModal}
                  onHide={() => this.toggleShowDeleteNodeModal()}
                />

                <AddLeafModal
                  show={this.state.showAddLeafModal} 
                  onHide={() => this.toggleShowAddLeafModal()}
                  parentNodeId={this.state.selectedItemId}
                />
                {this.state.showEditLeafModal && 
                <EditLeafModal
                  show={this.state.showEditLeafModal}
                  onHide={() => this.toggleShowEditLeafModal()}
                  leafId={this.state.selectedItemId}
                  leafName={this.state.activeNodeName}
                />}
            </Container>
        )
    }
}
function mapState(state){

    return state
}
const actionCreators = {
    getTree: treeActions.getTree,
    deleteLeaf: leafActions.deleteLeaf,
    sortNode: nodeActions.sortNode
}

const connectedApp = connect(mapState, actionCreators)(TreePage)
export {connectedApp as TreePage}