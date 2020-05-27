import React, { Component } from 'react'


class ContextMenu extends Component{

    render(){
        return(
            <React.Fragment>
                <ul className="contextMenu" style={{left: this.props.left, top: this.props.top}}>
                    <li onClick={(event) => {
                        event.stopPropagation()
                        this.props.showAddNodeModal()
                      
                    }}>Add Node</li>
                    <li>Add Leaf</li>
                    <li onClick={(event) => {
                        event.stopPropagation()
                        this.props.showEditNodeModal()
                    }}>Edit</li>

                    <li onClick={(event) => {
                        event.stopPropagation()
                        this.props.showDeleteNodeModal()
                    }}>Delete</li>
                </ul>
            </React.Fragment>
        )
    }

}

export default ContextMenu
