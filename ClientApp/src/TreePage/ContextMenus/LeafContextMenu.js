import React, { Component } from 'react'


export class LeafContextMenu extends Component{

    render(){
        return(
            <React.Fragment>
                <ul className="contextMenu" style={{left: this.props.left, top: this.props.top}}>
                    <li onClick={(event) => {
                        event.stopPropagation()
                        this.props.showEditLeafModal()
                    }}>Edit</li>

                    <li onClick={(event) => {
                        event.stopPropagation()
                        this.props.deleteLeaf()
                    }}>Delete</li>
                </ul>
            </React.Fragment>
        )
    }

}

