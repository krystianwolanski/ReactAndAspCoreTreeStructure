import { leafService } from '../_services'
import { leafConstants } from '../_constants'

export const leafActions = {
    addLeaf,
    editLeaf,
    deleteLeaf,
    moveLeaf
}

function addLeaf(Name, ParentNodeId ) {
    return dispatch => {
        dispatch(request())

        leafService.addLeaf(Name, ParentNodeId)
            .then(
                item => dispatch(success(item, ParentNodeId)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: leafConstants.ADD_LEAF_REQUEST } }
    function success(item, parentNodeId) { return { type: leafConstants.ADD_LEAF_SUCCESS, item, parentNodeId } }
    function failure(error) { return { type: leafConstants.ADD_LEAF_FAILURE, error } }
}

function editLeaf(LeafId, Name ) {
    return dispatch => {
        dispatch(request())

        leafService.editLeaf(LeafId, Name)
            .then(
                item => dispatch(success(LeafId,Name)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: leafConstants.EDIT_LEAF_REQUEST } }
    function success(LeafId, Name) { return { type: leafConstants.EDIT_LEAF_SUCCESS, LeafId, Name } }
    function failure(error) { return { type: leafConstants.EDIT_LEAF_FAILURE, error } }
}
function deleteLeaf(LeafId) {
    return dispatch => {
        dispatch(request())

        leafService.deleteLeaf(LeafId)
            .then(
                (item) => dispatch(success(LeafId)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: leafConstants.DELETE_LEAF_REQUEST } }
    function success(LeafId) { return { type: leafConstants.DELETE_LEAF_SUCCESS, LeafId } }
    function failure(error) { return { type: leafConstants.DELETE_LEAF_FAILURE, error } }
}
function moveLeaf(leafId, toNodeId) {
    return dispatch => {
        dispatch(request(leafId, toNodeId))

        leafService.moveLeaf(leafId, toNodeId)
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            )
    }

    function request(fromNodeId, toNodeId) { return { type: leafConstants.MOVE_LEAF_REQUEST, fromNodeId, toNodeId } }
    function success(items) { return { type: leafConstants.MOVE_LEAF_SUCCESS, items } }
    function failure(error) { return { type: leafConstants.MOVE_LEAF_FAILURE, error } }
}