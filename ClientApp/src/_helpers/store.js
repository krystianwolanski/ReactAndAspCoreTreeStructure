import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'

// const loggerMiddleware = createLogger();

// const composeEnhancers = composeWithDevTools({
//     // Specify name here, actionsBlacklist, actionsCreators and other options if needed
//   });
  
export const store = createStore(rootReducer, /* preloadedState, */ composeWithDevTools(

    applyMiddleware(
        thunkMiddleware,
        logger
        )
    ), );