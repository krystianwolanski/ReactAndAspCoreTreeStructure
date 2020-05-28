import { nodeService } from '../_services'
import { nodeConstants } from '../_constants'

export const nodeActions = {
    addNode,
    editNode,
    deleteNode,
    sortNode
}

function addNode(Name, ParentNodeId ) {
    return dispatch => {
        dispatch(request())

        nodeService.addNode(Name, ParentNodeId)
            .then(
                item => dispatch(success(item,ParentNodeId)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: nodeConstants.ADD_NODE_REQUEST } }
    function success(item, parentNodeId) { return { type: nodeConstants.ADD_NODE_SUCCESS, item, parentNodeId } }
    function failure(error) { return { type: nodeConstants.ADD_NODE_FAILURE, error } }
}

function editNode(NodeId, Name ) {
    return dispatch => {
        dispatch(request())

        nodeService.editNode(NodeId, Name)
            .then(
                item => dispatch(success(NodeId,Name)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: nodeConstants.EDIT_NODE_REQUEST } }
    function success(NodeId, Name) { return { type: nodeConstants.EDIT_NODE_SUCCESS, NodeId, Name } }
    function failure(error) { return { type: nodeConstants.EDIT_NODE_FAILURE, error } }
}
function deleteNode(NodeId ) {
    return dispatch => {
        dispatch(request())

        nodeService.deleteNode(NodeId)
            .then(
                item => dispatch(success(item)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: nodeConstants.DELETE_NODE_REQUEST } }
    function success(item) { return { type: nodeConstants.DELETE_NODE_SUCCESS, item } }
    function failure(error) { return { type: nodeConstants.DELETE_NODE_FAILURE, error } }
}
function sortNode(NodeId) {
    return dispatch => {
        dispatch(sort(NodeId))
    }

    function sort(NodeId) {return {type: nodeConstants.SORT_NODE, NodeId }}
}