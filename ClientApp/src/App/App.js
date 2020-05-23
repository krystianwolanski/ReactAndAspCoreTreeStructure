import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../_helpers';
import { TreePage } from '../TreePage' 

export class App extends React.Component {
    constructor(props) {
        super(props);      
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route path = "/" component = {TreePage}/> 
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </div>
        );
    }
}