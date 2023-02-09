import { HttpConfigTest } from './http.test.config';
import { HttpConfigBeta } from './http.beta.config';
import { HttpConfigDev } from './http.dev.config';
import { HttpConfigPreBeta } from './http.dist.config';
import { getCookie } from '@legions/utils-tool';
import { importScript } from 'runtime-import';
import { InterfaceHttpConfig } from '@/common/typings/config';
function getConfig() {
    if (process.env.environment === 'dist') {
        return HttpConfigPreBeta; // 预发布环境 执行指令yarn build:dist
    }
    else if (process.env.environment === 'production') {
        return HttpConfigBeta; // 生产环境 执行指令yarn build:prod
    }
    else if (process.env.environment === 'test') {
        return HttpConfigTest; // 测试环境 执行指令yarn build:test
    }
    else {
        return HttpConfigDev;// 开发环境 执行指令yarn dev
    }
}
export const HTTP_LOCAL_CONFIG = getConfig();
let HTTP_REMOTE_CONFIG: InterfaceHttpConfig['main'] = null;
export async function getRemoteConfig(url: string) {
    try {
      await importScript(`${url}?v=${new Date().getTime()}`,{ umd: false })
      HTTP_REMOTE_CONFIG = window['LEGIONS_MAIN_DOMAIN'].getConfig(process.env.environment).main;
    } catch (err) {
      console.error(err)
    }
}
export { HTTP_REMOTE_CONFIG };
export const setHeaders = (url: string, option?: Object, cookie?: string) => {
    let cookies = cookie ? cookie : 'uctoken=MzJhYWY1MzMtNjgxZC00MmJmLWE1NzgtMzA2Yzg1MTk3OTdl'
    if (process.env.environment !== 'dev') {
        cookies = (getCookie() || '')
    }
    let options = {
        'api-target': url,
        'api-cookie': cookies,
    }
    return option ? { ...options, ...option } : options
}
