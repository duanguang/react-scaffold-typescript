import { Route,Switch } from 'legions/router';
import React from 'react';
import '../assets/css/theme.less';


export default class App extends React.Component {
    constructor(props: {}) {
        super(props)
    }
    render() {
        return (
            <Switch>

                {/* <Route path="/admin" component={HomeManage}></Route> */}
                {/* <Route path="/" component={LcmTest}></Route> */}
                {/* <Route component={Todo}/> */}
            </Switch>
        );
    }
}
