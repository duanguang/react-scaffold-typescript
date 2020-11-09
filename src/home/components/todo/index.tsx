import React from 'react';
import { observer,bind } from 'legions/store-react';
import TodoStore from '../../stores/TodoStore';
import { Button } from 'antd';
interface ITodo {
    message: string
    store?: TodoStore
}
@bind({ store: TodoStore })
@observer
export default class Todo extends React.Component<ITodo> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.store.getMockData()
        let payload = { payloadModel: 'user',b: 2 };
        this.props.store.triggerEvent({ payload: payload });
    }
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h3>Welcome to React typescript Single page App </h3>
                {this.props.message}
                <p>正在获取用户信息:{this.props.store.obMockData.isRejected && this.props.store.obMockData.value.result.user.name}</p>
                <p>

                </p>
            </div>
        );
    }
}