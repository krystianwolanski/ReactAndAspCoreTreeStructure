import { treeService } from '../_services'
import { treeConstants } from '../_constants'

export const nodeActions = {
    addNode,
    editNode
}

function addNode(Name, ParentNodeId ) {
    return dispatch => {
        dispatch(request())

        treeService.addNode(Name, ParentNodeId)
            .then(
                item => dispatch(success(item,ParentNodeId)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: treeConstants.ADD_NODE_REQUEST } }
    function success(item, parentNodeId) { return { type: treeConstants.ADD_NODE_SUCCESS, item, parentNodeId } }
    function failure(error) { return { type: treeConstants.ADD_NODE_FAILURE, error } }
}

function editNode(NodeId, Name ) {
    return dispatch => {
        dispatch(request())

        treeService.editNode(NodeId, Name)
            .then(
                item => dispatch(success(NodeId,Name)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: treeConstants.EDIT_NODE_REQUEST } }
    function success(NodeId, Name) { return { type: treeConstants.EDIT_NODE_SUCCESS, NodeId, Name } }
    function failure(error) { return { type: treeConstants.EDIT_NODE_FAILURE, error } }
}