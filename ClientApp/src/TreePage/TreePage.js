import React, { Component } from 'react'
import {treeActions, leafActions, nodeActions} from '../_actions'
import { connect } from 'react-redux';
import './style.css'
import {NodeContextMenu, LeafContextMenu, RootContextMenu} from './ContextMenus'
import {AddNodeModal, EditNodeModal, DeleteNodeModal} from './Modals/NodeModals'
import {AddLeafModal, EditLeafModal} from './Modals/LeafModals'
import ReactDOM from 'react-dom'

class TreePage extends Component {

    state = {
        hidelistItemsId: [],
        selectedItem: '',
        selectedItemId: 0,
        activeNodeName: '',
        subNodes:'',
        subLeaves: '',

        showRootContextMenu: false,
        showNodeContextMenu: false,
        showLeafContextMenu: false,
        
        top:0,
        left:0,
        
        showAddNodeModal: false,
        showEditNodeModal: false,
        showDeleteNodeModal: false,

        showAddLeafModal: false,
        showEditLeafModal: false,

        dragStartElement: '',
        dragStartElementType:'',
        dropId: 0
      }
    
    componentDidMount(){
      this.props.getTree()
      window.addEventListener('click', this.hideContextMenu.bind(this))


      window.addEventListener('contextmenu', this.handleClickOutside)
    }
    componentWillUnmount(){
      window.removeEventListener('click',this.hideContextMenu.bind(this))
      window.removeEventListener('contextmenu', this.handleClickOutside)
    }
    handleClickOutside = event => {
      const domNode = ReactDOM.findDOMNode(this);
      const title = domNode.getElementsByClassName('title')
      
      event.preventDefault()
      if (!domNode || !domNode.contains(event.target) || title.length > 0) {
          this.setState({
            showRootContextMenu: true,
            left: event.clientX,
            top: event.clientY,
            showNodeContextMenu: false,
            showLeafContextMenu: false,
            selectedItemId: null,
            selectedItem: ''
          });
      }
  }
    addRootNode(Name) {
      this.props.addNode(Name, null)
    }
    hideContextMenu(){
      this.setState({showNodeContextMenu: false,showLeafContextMenu: false, showRootContextMenu: false })
    }
    setActiveNode(id) {   
        this.setState({activeNode: id})
    }
    handleOnContextMenu(event, selectedItemId, name, selectedItem, contextMenu, subNodes, subLeaves){
        let menuContext;
        if(contextMenu === 'showNodeContextMenu') {
          menuContext = {showNodeContextMenu: true, showLeafContextMenu: false, showRootContextMenu: false}
        }
        else {
          menuContext = {showNodeContextMenu: false, showLeafContextMenu: true, showRootContextMenu: false}
        }
          
        this.setState({
          subLeaves: subLeaves,
          subNodes: subNodes,
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
    deleteNode(nodeId){
      this.props.deleteNode(nodeId)
    }
    handleOnDragOver(event){
      event.preventDefault()

    }
    handleOnDrop(event, node){
      event.preventDefault()
      
      const {dragStartElement, dragStartElementType} = this.state
      if(dragStartElementType === 'node') {
        if(!node.subNodes.includes(dragStartElement) && !dragStartElement.subNodes.includes(node) && (dragStartElement.nodeId !== node.nodeId) ) {
          this.props.moveNode(dragStartElement.nodeId, node.nodeId)
        }
      }
      else if(dragStartElementType === 'leaf') {
        if(!node.subLeaves.includes(dragStartElement)) {
          this.props.moveLeaf(dragStartElement.leafId, node.nodeId)
        }
      }
    }
    handleOnLeafDrop(event, node) {
      event.preventDefault()

      const {dragStartElement} = this.state
      
      if(!node.subNodes.includes(dragStartElement) && !dragStartElement.subNodes.includes(node) && (dragStartElement.nodeId !== node.nodeId) ) {
        this.props.moveNode(dragStartElement.nodeId, node.nodeId)
      }
    }
    handleOnDragNodeStart(element){
      this.setState({dragStartElement: element, dragStartElementType: 'node', selectedItem: ''})
    }
    handleOnDragLeafStart(element) {
      this.setState({dragStartElement: element, dragStartElementType: 'leaf', selectedItem: ''})
    }

    renderSubNodes(subNodes) {
        return (
          <React.Fragment >
            {subNodes.map((node) => (
                <ul className="treeContextMenuUl">
                  <li className = {this.state.hidelistItemsId.includes(node.nodeId) ? "hide":""} key={node.Id}>
                      <div
                        draggable={true}
                        onDragStart={() => this.handleOnDragNodeStart(node)}
                        onDragOver={(event) => this.handleOnDragOver(event, node.nodeId)}
                        onDrop={(event) => this.handleOnDrop(event, node)}
                        onContextMenu={(event) => this.handleOnContextMenu(event, node.nodeId, node.name, "n"+node.nodeId,'showNodeContextMenu', node.subNodes, node.subLeaves)}
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
                        <ul className="treeContextMenuUl">
                          {node.subLeaves.map((leaf) => (
                            <li>
                              <div
                                draggable={true}
                                onDragStart={() => this.handleOnDragLeafStart(leaf)}
                                onDragOver={(event) => this.handleOnDragOver(event)}
                                
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
        
        if(tree2 && tree2.length > 0){
          return(
          
            <div className="ownContainer">
                <h1>Tree Structure</h1>
                {tree2 && this.renderSubNodes(tree2)}
                

                {
                  this.state.showRootContextMenu &&
                    <RootContextMenu
                      showAddNodeModal={() => this.toggleShowAddNodeModal()}
                      left={this.state.left}
                      top={this.state.top}
                      hide={() => this.hideContextMenu()}
                    />
                }

                {
                  this.state.showNodeContextMenu &&
                    <NodeContextMenu
                      subNodes = {this.state.subNodes}
                      subLeaves = {this.state.subLeaves}
                      deleteNode = {() => this.deleteNode(this.state.selectedItemId)}  
                      showAddNodeModal={() => this.toggleShowAddNodeModal()}
                      showEditNodeModal={() => this.toggleShowEditNodeModal()}
                      showDeleteNodeModal={() => this.toggleShowDeleteNodeModal()}
                      showAddLeafModal={() => this.toggleShowAddLeafModal()}
                      sort={() => this.sort(this.state.selectedItemId)}
                      left={this.state.left}
                      top={this.state.top}
                      hide={() => this.hideContextMenu()}
                    />
                }

                {
                  this.state.showLeafContextMenu &&
                    <LeafContextMenu
                      showEditLeafModal = {() => this.toggleShowEditLeafModal()}
                      deleteLeaf={() => this.deleteLeaf(this.state.selectedItemId)}
                      left = {this.state.left}
                      top = {this.state.top}
                      hide={() => this.hideContextMenu()}
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
            </div>
        )
    }
    else if(tree2 && tree2.length <= 0){
      return(
        <div className="ownContainer">
          <h1 className="title">Right click to display the menu</h1>
          {
            this.state.showRootContextMenu &&
              <RootContextMenu
                showAddNodeModal={() => this.toggleShowAddNodeModal()}
                left={this.state.left}
                top={this.state.top}
                hide={() => this.hideContextMenu()}
              />
            }
            <AddNodeModal
            show={this.state.showAddNodeModal} 
            onHide={() => this.toggleShowAddNodeModal()}
            parentNodeId={this.state.selectedItemId}
          />
        </div>
      )
    }
    else{
      return(
        <div></div>
      )
    }
        }
}
function mapState(state){

    return state
}
const actionCreators = {
    getTree: treeActions.getTree,
    deleteLeaf: leafActions.deleteLeaf,
    sortNode: nodeActions.sortNode,
    deleteNode: nodeActions.deleteNode,
    addNode: nodeActions.addNode,
    moveNode: nodeActions.moveNode,
    moveLeaf: leafActions.moveLeaf
}

const connectedApp = connect(mapState, actionCreators)(TreePage)
export {connectedApp as TreePage}