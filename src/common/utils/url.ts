/** 获取链接参数 */
export function getUrlParam(url:string, name:string):string {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = url.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}

 /** 设置queryString */
 export function setQueryString(url: string, p?: Record<string, string | number | null | undefined>): string {
    const [path, pamars] = url?.split?.('?') || []
    let result = path + '?'
    const paramsObj = (pamars?.split?.('&') || []).reduce((obj, cur) => {
        const [key, value] = cur?.split?.('=') || []
        if(!!key) {
            obj[key] = unescape(value)
        }
        return obj
    }, {})

    const newParamsObj = {
        ...paramsObj,
        ...p,
    }

    for (const key in newParamsObj) {
        if (Object.prototype.hasOwnProperty.call(newParamsObj, key)) {
            const el = newParamsObj[key];
            result += `${key}=${escape(el)}&`
        }
    }

    if(/\&$/.test(result) && !/\&$/.test(url)) {
        result = result.slice(0, -1)
    }

    if(/\?$/.test(result) && !/\?$/.test(url)) {
        result = result.slice(0, -1)
    }

    return result
}
