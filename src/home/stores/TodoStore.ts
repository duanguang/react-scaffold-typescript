import StoreBase, { IStoreBaseMeta } from '../../common/stores/StoreBase';
import {observable,autorun,action, computed} from 'mobx';
import { observablePromise,ObservableTempState } from 'legions/store-utils';
import {resource} from 'legions/store';
import { MockContainerEntity } from '../models/mockEntity';
import { getMockData } from '../services/message';
import UserInfoStore, { User } from './UserInfoStore';
interface IContext{
    UserInfoApp:UserInfoStore,
}
export interface ITriggerEventPrams{  
    payload:{
        payloadModel:string,
        b:number
    }
}
export default class TodoStore extends StoreBase<IContext>{
    static meta :IStoreBaseMeta={
        ...StoreBase.meta,      
        className:'TodoStore',
        eventScopes: [User],
        contextTypes:{
            UserInfoApp:UserInfoStore
        }
    }
    constructor(context){
        super(context);
        this.watch()
    }
    @observable obMockData=observablePromise<MockContainerEntity>();
    
    watch=()=>{
        autorun(()=> {
            console.log('数据状态',this.obMockData.state)
         });
    }

    @action getMockData(){
        this.obMockData=observablePromise(getMockData());
    }
    triggerEvent(payload:ITriggerEventPrams) {
        this.context.dispatch(User.created,payload);
    }
}