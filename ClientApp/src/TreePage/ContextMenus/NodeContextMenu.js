import React, { Component } from 'react'


export class NodeContextMenu extends Component{

    render(){
        return(
            <React.Fragment>
                <ul className="contextMenu" style={{left: this.props.left, top: this.props.top}}>
                    <li onClick={(event) => {
                        event.stopPropagation()
                        this.props.showAddNodeModal()
                        this.props.hide()
                    }}>Add Node</li>
                    
                    <li onClick={(event) => {
                        event.stopPropagation();
                        this.props.showAddLeafModal()
                        this.props.hide()
                    }}>Add Leaf</li>

                    <li onClick={(event) => {
                        event.stopPropagation()
                        this.props.showEditNodeModal()
                        this.props.hide()
                    }}>Edit</li>

                    <li onClick={(event) => {
                        event.stopPropagation()
                        if(this.props.subNodes.length > 0 || this.props.subLeaves.length > 0) {
                            this.props.showDeleteNodeModal()
                        }
                        else{
                            this.props.deleteNode()
                        }
                        this.props.hide()
                    }}>Delete</li>

                    <li onClick={(event) => {
                        event.stopPropagation()
                        this.props.sort()
                        this.props.hide()
                    }}>Sort</li>
                </ul>
            </React.Fragment>
        )
    }

}

