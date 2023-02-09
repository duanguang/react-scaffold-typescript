import { getPath } from "./path";

export const setMain =(mode: 'browser' | 'hash'='browser')=> {
    return {
        list:getPath('/',mode)
    }
};
