import StoreBase from "../StoreBase";
import {Lifecycle} from "legions/store";
export default class UiStoreBase extends StoreBase {
    static meta = {
        ...StoreBase.meta,
        namespace: `${StoreBase.namespace}.ui`,
        lifecycle: Lifecycle.Location
    }
}
