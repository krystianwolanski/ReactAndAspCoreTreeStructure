import React, { Component } from 'react'
import {treeActions} from '../_actions'
import { connect } from 'react-redux';

class TreePage extends Component {
    constructor(props){
        super(props)
        
    }
   
    componentDidMount() {
        this.props.getTree()
        
    }

    renderTree(parentId) {
        const nodes = this.items && this.items.filter(x => x.parentNodeId == parentId)
        console.log(nodes)
    }
    render() {
        const {items} = this.props.tree;
        this.items = items;
        
        this.renderTree()
        return(
            <React.Fragment>
                <h1>Hello World!</h1>
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