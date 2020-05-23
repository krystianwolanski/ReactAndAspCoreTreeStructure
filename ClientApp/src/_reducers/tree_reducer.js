import {treeConstants} from '../_constants'

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
        default:
            return state;
    }
}