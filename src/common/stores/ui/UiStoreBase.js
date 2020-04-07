import StoreBase from "../StoreBase";
import { Lifecycle } from "legions/store";
export default class UiStoreBase extends StoreBase {
}
UiStoreBase.meta = Object.assign({}, StoreBase.meta, { namespace: `${StoreBase.namespace}.ui`, lifecycle: Lifecycle.Location });
