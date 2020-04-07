import { HttpConfigTest } from './http.test.config';
import { HttpConfigBeta } from './http.beta.config';
import { HttpConfigDev } from './http.dev.config';
import { HttpConfigPreBeta } from './http.dist.config';
function getConfig(){
    if(process.env.environment==='dist'){
        return HttpConfigPreBeta; //预发布环境 执行指令yarn build:dist
    }
    else if(process.env.environment==='production'){
       return HttpConfigBeta; //生产环境 执行指令yarn build:prod
    }
    else if(process.env.environment==='test'){
       return HttpConfigTest; //测试环境 执行指令yarn build:test
    }
    else{
      return HttpConfigDev;//开发环境 执行指令yarn dev
    }
}

export const HttpConfig =getConfig();