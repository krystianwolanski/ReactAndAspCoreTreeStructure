import React, { Component } from 'react'


class ContextMenu extends Component{

    render(){
        const {left, top} = this.props 
        return(
            <React.Fragment>
                <ul className="contextMenu" style={{left: left, top: top}}>
                    <li onClick={(event) => {
                        event.stopPropagation()
                        this.props.showAddNodeModal()
                      
                    }}>Add Node</li>
                    <li onClick={(event) => {
                        event.stopPropagation()
                        this.props.showEditNodeModal()
                    }}>Edit Node</li>
                </ul>
    
                
            </React.Fragment>
            
        )
    }

}

export default ContextMenu
