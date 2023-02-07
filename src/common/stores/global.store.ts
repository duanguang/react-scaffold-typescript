import { StoreModules,Store,StoreMeta,resource } from '@legions/core/store';
import { LegionsProLayout,LegionsProTable } from '@legions/pro-design';
const WorkerGlobalStateStore =  LegionsProLayout.WorkerGlobalStateStore
interface IContext{
/*  UserInfoApp:UserInfoStore, */
}
interface IGlobalState{
}
@StoreModules
class GlobalStateStore extends WorkerGlobalStateStore<IGlobalState>{
    static meta :StoreMeta={
        ...Store.meta,
    }
    /** 用户信息 */
    constructor(context:IContext){
        super(context);
    }

}
export const globalStateStore = () => {
    const _store = Store.getStore(GlobalStateStore)
    return _store
}
LegionsProTable.setGlobalConfig({
    setUserUid: async () => {
        return new Promise((resolve) => {
            const _store = globalStateStore()
            resolve(_store.user?.user_uid)
        })
    }
})
export const userEvent = resource('master/resource/user');
