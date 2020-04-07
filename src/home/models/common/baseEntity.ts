import { MapperEntity } from "json-mapper-object";

export class BaseEntity<T> {

  /**
   *操作结果
   *
   * @type {boolean}
   * @memberof BaseEntity
   */
  success :boolean = true;

  /**
   * 描述信息
   *
   * @type {string}
   * @memberof BaseEntity
   */
  message:string = '';

  /**
   * 提示信息编码
   *
   * @type {(string|number)}
   * @memberof BaseEntity
   */
  code:string|number = '';


  /**
   *返回数据信息
   *
   * @type {T}
   * @memberof BaseEntity
   */
  result:T = null;
  constructor(fromJson) {
  }
  transformArray(rows, mapEntity) {
    return (rows || []).map((row) => {
      return this.transformRow(row, mapEntity);
    })
  }
  transformRows(rows, mapEntity) {
    return (rows || []).map((row) => {
      return this.transformRow(row, mapEntity);
    })
  }
  transformRow(row, mapEntity) {
    return MapperEntity(mapEntity, row);
  }
}

export class ContainerEntity<T> extends BaseEntity<T> {
  constructor(fromService) {
    super(fromService);
    if(fromService&&typeof fromService==='object'){
      this.code= fromService.status||''
      this.message = fromService.msg||''
      this.result = fromService.data
      this.success = fromService.ok||false
    }
  }
}
