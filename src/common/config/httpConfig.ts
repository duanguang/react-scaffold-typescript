import { HttpConfigTest } from './http.test.config';
import { HttpConfigBeta } from './http.beta.config';
import { HttpConfigDev } from './http.dev.config';
import { HttpConfigPreBeta } from './http.dist.config';
import { getCookie } from '@legions/utils-tool';
import { importScript } from 'runtime-import';
import { InterfaceHttpConfig } from '@/common/typings/config';
import lodash from 'lodash'
async function getConfig() {
  if (process.env.environment === 'dist') {
    return HttpConfigPreBeta; // 预发布环境 执行指令yarn build:dist
  } else if (process.env.environment === 'production') {
    return HttpConfigBeta; // 生产环境 执行指令yarn build:prod
  } else if (process.env.environment === 'test') {
    return HttpConfigTest; // 测试环境 执行指令yarn build:test
  } else {
    return HttpConfigDev; // 开发环境 执行指令yarn dev
  }
}

let HTTP_REMOTE_CONFIG: InterfaceHttpConfig['main'] = null;
export const HTTP_LOCAL_CONFIG = getConfig();
export async function getRemoteConfig(url: string) {
  try {
    await importScript(`${url}?v=${new Date().getTime()}`,{ umd: false })
    HTTP_REMOTE_CONFIG = window['LEGIONS_MAIN_DOMAIN'].getConfig(process.env.environment).main;
  } catch (err) {
    console.error(err)
  }
}

export const getUCTOKEN = () => {
  let keys = document.cookie.split('; ')
  let token = lodash.find(keys, (item) => { return item.includes('UCTOKEN') || item.includes('uctoken') })
  if (!lodash.isEmpty(token)) {
      let uctoken = lodash.split(token, '=')[1] || ''
      return uctoken
  }
  return ''
}


export const getToken = () => {
  let cookie = getCookie()
  cookie = `${cookie}; HL-Access-Token=${getUCTOKEN()}`
  return cookie
}

export const setHeaders = (url: string,option?: Object,cookie?: string) => {
  let cookies = cookie ? cookie : getToken();
    let options = {
        headers: {
            'api-target': url,
            'api-cookie': cookies,
        }
    };
    return option ? { ...options, ...option } : options;

};

/** 处理表单请求 */
export const setFormHeaders = (url: string, option?: Object, cookie?: string) => {
  const cookies = cookie ? cookie : getToken();
  const headerConfig = {
      'api-target': url,
      'api-cookie': cookies,
      'Content-Type': 'application/x-www-form-urlencoded' as "application/x-www-form-urlencoded",
  }
  const options = {
      headers: headerConfig,
      // 覆盖header
      transformRequest: (configs, url) => {
          return { ...configs, url, headers: headerConfig }
      },
      ...option,
  };
  return options;
};

