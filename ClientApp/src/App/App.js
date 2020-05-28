import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../_helpers';
import { TreePage } from '../TreePage/TreePage' 

export class App extends React.Component {

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
