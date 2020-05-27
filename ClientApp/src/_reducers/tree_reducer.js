import {treeConstants, nodeConstants} from '../_constants'

export function tree(state = {}, action) {
    switch(action.type) {
        case treeConstants.GET_TREE_REQUEST:
            return {
                treeLoading: true,
            }
        case treeConstants.GET_TREE_SUCCESS:
            return {
                treeLoading: false,
                items: action.items
            }
        case treeConstants.GET_TREE_FAILURE:
            return {
                error: action.error
            }

        case nodeConstants.ADD_NODE_REQUEST:
            return {
                ...state,
                addingNode: true
            }
        case nodeConstants.ADD_NODE_SUCCESS:   
            function addSubNode(subNodes) {
                subNodes.forEach(element => {
                    if (element.nodeId === action.parentNodeId) {
                        element.subNodes.push(action.item)
                        
                        return subNodes
                    }
                    else {
                        addSubNode(element.subNodes)
                    }
                });
            }
            addSubNode(state.items)

            return {
                items: state.items,
                addingNode: false
            }
        case nodeConstants.ADD_NODE_FAILURE:
            return {
                error: action.error
            }

        case nodeConstants.EDIT_NODE_REQUEST:
            return{
                items: state.items,
                editingNode: true
            }
        case nodeConstants.EDIT_NODE_SUCCESS:
            function editElement(subNodes){
                subNodes.forEach( element => {
                    if (element.nodeId === action.NodeId) {
                        element.name = action.Name
                        
                        return subNodes
                    }
                    else{
                        editElement(element.subNodes)
                    }
                }) 
            }
            editElement(state.items)            
            return {
                items: state.items,
                editingNode: false
            }
        case nodeConstants.EDIT_NODE_FAILURE:
            return{
                error: action.error
            }
        case nodeConstants.DELETE_NODE_REQUEST:
            return{
                deletingNode: true
            }
        case nodeConstants.DELETE_NODE_SUCCESS:
            return{
                deletingNode: false
            }
        case nodeConstants.DELETE_NODE_FAILURE:
            return{
                error: action.error
            }

        default:
            return state;
    }
}