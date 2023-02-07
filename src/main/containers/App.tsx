import { getRoutes } from '@/common/route';
import { Route,Switch } from '@legions/core/router';
import React from 'react';
import { HelloWorld } from './hello.world';

const routes = getRoutes('browser');
export default class App extends React.Component {
    constructor(props: {}) {
        super(props)
    }
    render() {
        console.log('222',routes,this.props)
        return (
            <Switch>
                <Route component={HelloWorld} path={ routes.main.list} />
            </Switch>
        );
    }
}
