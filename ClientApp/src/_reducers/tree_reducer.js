import {treeConstants, nodeConstants, leafConstants} from '../_constants'

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
                items: state.items,
                error: action.error
            }

        case nodeConstants.ADD_NODE_REQUEST:
            return {
                ...state,
                addingNode: true
            }
        case nodeConstants.ADD_NODE_SUCCESS:   

            addNode(state.items)

            return {
                items: state.items,
                addingNode: false
            }
        case nodeConstants.ADD_NODE_FAILURE:
            return {
                items: state.items,
                error: action.error
            }

        case nodeConstants.EDIT_NODE_REQUEST:
            return{
                items: state.items,
                editingNode: true
            }
        case nodeConstants.EDIT_NODE_SUCCESS:

            editNode(state.items)            
            return {
                items: state.items,
                editingNode: false
            }
        case nodeConstants.EDIT_NODE_FAILURE:
            return{
                items: state.items,
                error: action.error
            }
        case nodeConstants.DELETE_NODE_REQUEST:
            return{
                items: state.items,
                deletingNode: true
            }
        case nodeConstants.DELETE_NODE_SUCCESS:
            deleteNode(state.items)
            return{
                items: state.items,
                deletingNode: false
            }
        case nodeConstants.DELETE_NODE_FAILURE:
            return{
                items: state.items,
                error: action.error
            }
        case nodeConstants.SORT_NODE:
            sortNode(state.items)
            return {
                items: state.items
            }
        case nodeConstants.MOVE_NODE_REQUEST:
            return {
                items: state.items,
                nodeMoving: true
            }
        case nodeConstants.MOVE_NODE_SUCCESS:
            return {
                items: action.items,
                nodeMoving: false
            }
        case nodeConstants.MOVE_NODE_FAILURE:
            return {
                items: state.items,
                error: action.error
            }
        case leafConstants.ADD_LEAF_REQUEST:
            return {
                items: state.items,
                addingLeaf: true
            }
        case leafConstants.ADD_LEAF_SUCCESS:
            addLeaf(state.items)
            return {
                items: state.items,
                addingLeaf: false
            }
        case leafConstants.ADD_LEAF_FAILURE:
            return {
                items: state.items,
                error: action.error
            }
        case leafConstants.EDIT_LEAF_REQUEST:
            return{
                items: state.items,
                leafEditing: true
            }
        case leafConstants.EDIT_LEAF_SUCCESS:
            editLeaf(state.items)
            return{
                items: state.items,
                leafEditing: false
            }
        case leafConstants.EDIT_LEAF_FAILURE:
            return{
                error: action.error
            }
        case leafConstants.DELETE_LEAF_REQUEST:
            return {
                items: state.items,
                leafDeleting: true
            }
        case leafConstants.DELETE_LEAF_SUCCESS:
            deleteLeaf(state.items)
            return {
                items: state.items,
                leafDeleting: false
            }
        case leafConstants.DELETE_LEAF_FAILURE:
            return {
                items: state.items,
                error: action.error
            }
        case leafConstants.MOVE_LEAF_REQUEST:
            return {
                items: state.items,
                leafMoving: true
            }
        case leafConstants.MOVE_LEAF_SUCCESS:
            return {
                items: action.items,
                leafMoving: false
            }
        case leafConstants.MOVE_LEAF_FAILURE:
            return {
                items: state.items,
                error: action.error
            }    
        
        default:
            return state;
    }
    
    function addNode(subNodes) {
        if(action.parentNodeId === null){
            subNodes.push(action.item)

            return subNodes
        }
        subNodes.forEach(element => {
            if (element.nodeId === action.parentNodeId) {
                element.subNodes.push(action.item)
                
                return subNodes
            }
            else {
                addNode(element.subNodes)
            }
        });
    }
    function editNode(subNodes){
        subNodes.forEach( element => {
            if (element.nodeId === action.NodeId) {
                element.name = action.Name
                
                return subNodes
            }
            else{
                editNode(element.subNodes)
            }
        }) 
    }
    function addLeaf(subNodes) {
        subNodes.forEach(node => {
            if(node.nodeId === action.parentNodeId) {
                node.subLeaves.push(action.item)

                return node.subLeaves
            }
            else{
                addLeaf(node.subNodes)
            }
        });
    }
    function editLeaf(subNodes) {
        subNodes.forEach( node => {
            if(node.subLeaves.length > 0) {
                node.subLeaves.forEach( leaf => {   
                    if(leaf.leafId === action.LeafId) {
                        leaf.name = action.Name
                        
                        return node.subLeaves
                    }
                })
            }
            editLeaf(node.subNodes)
        })
    }
    function deleteNode(subNodes) {
        subNodes.forEach( node => {
            if(node.nodeId === action.NodeId){
                const index = subNodes.indexOf(node)
                subNodes.splice(index, 1)
                
                return node
            }
            else{
                deleteNode(node.subNodes)
            }
        })
    }
    function deleteLeaf(subNodes) {
        subNodes.forEach( node => {
            if(node.subLeaves.length > 0) {
                node.subLeaves.forEach( leaf => {
                    if(leaf.leafId === action.LeafId) {
                        const index = node.subLeaves.indexOf(leaf)
                        node.subLeaves.splice(index, 1)

                        return node.subLeaves
                    }
                })
            }
            deleteLeaf(node.subNodes)
        })
    }

    function sortNode(subNodes) {
        subNodes.forEach( node => {
            if(node.nodeId === action.NodeId){
                function compare(a, b) {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                  
                    let comparison = 0;
                    if (nameA > nameB) {
                      comparison = 1;
                    } else if (nameA < nameB) {
                      comparison = -1;
                    }
                    return comparison;
                  }
                node.subNodes.sort(compare)
                node.subLeaves.sort(compare)

                return node
            }
            else{
                sortNode(node.subNodes)
            }
        })
    }

}