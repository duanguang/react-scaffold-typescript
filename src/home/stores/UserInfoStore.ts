import StoreBase, { IStoreBaseMeta } from '../../common/stores/StoreBase';
import {observable,autorun,action, computed} from 'mobx';
import { observablePromise,ObservableTempState } from 'legions/store-utils';
import { MockPageListEntity } from '../models/mockListEntity';
import { getMockListData } from '../services/message';
import {resource} from 'legions/store';
import { ITriggerEventPrams } from './TodoStore';
export const User = resource('PMS/User');
interface IEvent{
    name:string,
    scope:string
}
export default class UserInfoStore extends StoreBase{
    static meta:IStoreBaseMeta={
        ...StoreBase.meta,
        className:'UserInfoStore',
        eventScopes: [User],
    }
    // constructor(context){
    //     super(context);
    // }
    @observable obMockList=observablePromise<MockPageListEntity>();
    
    @action getMockList(){
        this.obMockList=observablePromise(getMockListData());       
    }
    @action
    onEvent(event:IEvent&ITriggerEventPrams) {
        console.log(event,'1111111')
    }
}