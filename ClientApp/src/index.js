import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

import "bootswatch/dist/united/bootstrap.min.css"; 
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();