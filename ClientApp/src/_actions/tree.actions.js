import { treeService } from '../_services'
import { treeConstants } from '../_constants'

export const treeActions = {
    getTree
}

function getTree() {
    return dispatch => {
        dispatch(request())

        treeService.getTree()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            )
    }

    function request() { return { type: treeConstants.GET_TREE_REQUEST } }
    function success(items) { return { type: treeConstants.GET_TREE_SUCCESS, items } }
    function failure(error) { return { type: treeConstants.GET_TREE_FAILURE, error } }
}