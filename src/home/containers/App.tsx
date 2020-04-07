import React from 'react';
import Todo from '../components/todo';
import {Route, Switch} from "legions/router";
export default class App extends React.Component<{}> {
    render(){
        return (
            <div>
                <Switch>             
                    <Route  component={Todo}/>
                </Switch>
            </div>
        );
    }
}