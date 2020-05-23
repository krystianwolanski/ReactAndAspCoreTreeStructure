import React, { Component } from 'react'
import {treeActions} from '../_actions'
import { connect } from 'react-redux';

class TreePage extends Component {
    
    componentDidMount() {
        getTree()
    }
    render() {
        return(
            <React.Fragment>
                <h1>Hello World!</h1>
            </React.Fragment>
        )
    }
}

const actionCreators = {
    getTree: treeActions.getTree
}

const connectedApp = connect(actionCreators)(TreePage)
export {connectedApp as TreePage}