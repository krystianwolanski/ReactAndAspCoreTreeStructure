import React, { Component } from 'react'
import {treeActions} from '../_actions'
import { connect } from 'react-redux';
import Node from './Node/Node'
import './style.css'
import ContextMenu from './ContextMenu'

class TreePage extends Component {

   
    componentDidMount() {
        //this.props.getTree()
        document.body.addEventListener('click', () => this.handleClick())
    }
    componentWillUnmount() {
        document.body.removeEventListener('click', () => this.handleClick())
    }
    state = {activeNode: 0, showContextMenu: false, top:0, left:0}

    setActiveNode(id) {
        this.setState({activeNode: id})
    }
    handleClick() {
        this.setState({showContextMenu: false})
    }
    handleContextMenu(event, id){
        event.preventDefault()
        
        this.setActiveNode(id)
        this.setState({showContextMenu: true, left: event.clientX, top: event.clientY})
        
    }

    renderSubNodes(subNodes) {
        const {activeNode} = this.state
        return (
          <ul>
            {subNodes.map((node) => (
                <React.Fragment>
                    <li>
                        <div onContextMenu={(event) => this.handleContextMenu(event, node.id)} className={activeNode===node.id?"bgSelected":""} key={node.id} onClick={() => this.setActiveNode(node.id)}>
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
        //const {items} = this.props.tree;
        const tree = [
            {
              id: 1,
              name: 'node1',
              subNodes: [
                {
                    id: 4,
                  name: 'node1-1',
                  subNodes: [],
                },
                {
                    id: 5,
                  name: 'node1-2',
                  subNodes: [],
                },
              ],
            },
            {
                id: 2,
              name: 'node2',
              subNodes: [],
            },
            {
                id: 3,
              name: 'node3',
              subNodes: [
                {
                    id: 6,
                  name: 'node3-1',
                  subNodes: [
                    {
                        id: 7,
                      name: 'node3-1-1',
                      subNodes: [],
                    },
                    {
                        id: 8,
                      name: 'node3-1-2',
                      subNodes: [],
                    },
                  ],
                },
                {
                    id: 9,
                  name: 'node3-2',
                  subNodes: [],
                }
              ],
            },
          ];

        return(
            <React.Fragment>
                {this.renderSubNodes(tree)}
                {this.state.showContextMenu? <ContextMenu left={this.state.left} top={this.state.top}/>:''}
            
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