import { Route,Switch } from '@legions/core/router';
import React from 'react';
import { Button } from 'antd-mobile'
import { Login } from './login';
import 'antd-mobile/es/global'
import '@/common/utils/flexible.js';
import { getRoutes } from '@/common/route';
const routes = getRoutes('browser');
export default class App extends React.Component {
    constructor(props: {}) {
        super(props)
    }
    render() {
        return (
            <Switch>
                {/* <Button block color='primary' size='middle'>default12</Button> */}
                <Route path={routes.main.list} component={Login}></Route>
            </Switch>
        );
    }
}
