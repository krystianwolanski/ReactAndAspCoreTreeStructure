import React, { Component } from 'react'


export class RootContextMenu extends Component{

    render(){
        return(
            <React.Fragment>
                <ul className="contextMenu" style={{left: this.props.left, top: this.props.top}}>
                    <li onClick={(event) => {
                        event.stopPropagation()
                        this.props.showAddNodeModal()
                        this.props.hide()
                    }}>Add Node</li>
                    
                </ul>
            </React.Fragment>
        )
    }

}

