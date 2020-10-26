import { HttpConfig, setHeaders } from '../constants/httpConfig';
import { post } from 'legions/request';
import { ContainerEntity } from '../models/common/baseEntity';


/* 提交参数 */
export class ZsSumbieParames{
    /* 申请产品 */
    productType:string = null;
    /* 服务形式 */
    serviceType: number = void 0;
    /* 联系人 */
    linkmanName: string = null;
    /* 联系人电话 */
    phone: string = null;
    /* 备注 */
    message: string = null;
    /* 中山官网 */
    resource: number = 2
}
/* 提交接口 */
export function getSave(params: ZsSumbieParames) {
    let options = setHeaders(`${HttpConfig.domainLcm}frontapi/productservice/save`)
    return post(`${HttpConfig.gateWay}`,params, options).then((res) => {
        return new ContainerEntity(res);
    })
}