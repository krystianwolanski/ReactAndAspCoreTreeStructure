import { combineReducers } from "redux";
import {tree} from './tree_reducer'

const rootReducer = combineReducers({
    tree
});

export default rootReducer;