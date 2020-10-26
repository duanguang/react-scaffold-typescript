import StoreBase, { IStoreBaseMeta } from '../../common/stores/StoreBase'
import { observable, action } from 'legions/store';
import { observablePromise } from 'legions/store-utils';
import { ContainerEntity } from '../models/common/baseEntity';
import { getSave, ZsSumbieParames } from '../services/zsMobile';

 export default class ZsMobileStore extends StoreBase{
    static meta:IStoreBaseMeta={
        ...StoreBase.meta,
        className:'ZsMobileStore',
    }

     /* 提交 */
     @observable saveData=observablePromise<ContainerEntity<{}>>();

    /** 获取列表信息 */
    @action getSaveData(params:ZsSumbieParames){
        this.saveData=observablePromise(getSave(params))
    }
 }