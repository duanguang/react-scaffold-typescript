/*
 * @Author: duanguang
 * @Date: 2021-04-30 16:16:56
 * @LastEditTime: 2021-05-04 00:48:10
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /react-scaffold-typescript/src/home/containers/App.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Route,Switch } from 'legions/router';
import React from 'react';
import { Button,WhiteSpace,WingBlank } from 'antd-mobile';
import { Login } from './login';
import '../../common/utils/flexible.js';
export default class App extends React.Component {
    constructor(props: {}) {
        super(props)
    }
    render() {
        return (
            <Switch>
                {/* <WingBlank>
                    <Button>default111</Button><WhiteSpace />
                    <Button disabled>default disabled</Button><WhiteSpace />

                    <Button type="primary">primary</Button><WhiteSpace />
                    <Button type="primary" disabled>primary disabled</Button><WhiteSpace />

                    <Button type="warning">warning</Button><WhiteSpace />
                    <Button type="warning" disabled>warning disabled</Button><WhiteSpace />

                    <Button loading>loading button</Button><WhiteSpace />
                    <Button icon="check-circle-o">with icon</Button><WhiteSpace />
                    <Button icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/jBfVSpDwPbitsABtDDlB.svg" alt="" />}>with custom icon</Button><WhiteSpace />
                    <Button icon="check-circle-o" inline size="small" style={{ marginRight: '4px' }}>with icon and inline</Button>
                    <Button icon="check-circle-o" inline size="small">with icon and inline</Button>
                    <WhiteSpace />
                </WingBlank> */}
                <Route path="/login" component={Login}></Route>
                {/* <Route path="/admin" component={HomeManage}></Route> */}
                {/* <Route path="/" component={LcmTest}></Route> */}
                {/* <Route component={Todo}/> */}
            </Switch>
        );
    }
}
