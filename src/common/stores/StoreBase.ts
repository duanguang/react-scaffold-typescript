import Store from "legions/store";

import {project} from "../constants/config";
import {StoreSpace} from 'brain-store'
interface IDispatchPrams{
   name:string,
   scope:string
}
interface IContext{
    dispatch:(name:IDispatchPrams,payload:Object)=>{}
}
export interface IStoreBaseMeta extends StoreSpace.PramsMeta{}
export default class StoreBase<T= {},P={}> extends Store {
    static meta : IStoreBaseMeta = {
        ...Store.meta,
        namespace: project.name,
    }
    context:T&IContext
}