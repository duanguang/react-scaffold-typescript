import { message } from "antd";
import { JsonProperty } from "json-mapper-object";

/** 文件模板实体 */
export class TemplateEntity {
  @JsonProperty('id')
  id: number;
  @JsonProperty('fileKey')
  fileKey: string;
  @JsonProperty('fileValue')
  fileValue: string;
}

interface IBlockProps<T> {
  /** 请求方式 */
  method: 'get' | 'post',
  /** 请求链接 */
  url: string,
  token: string,
  downloadName?: string,
  /** 请求参数 */
  data?: T
}

/**
 * 请求文件流并下载
 * @param props { IBlockProps }
 */
 export default function openNonBlock<T>(props: IBlockProps<T>) {
  message.warn('正在导出...')
  const fetch = new XMLHttpRequest()
  fetch.open(props.method, props.url)
  fetch.setRequestHeader("Authorization", props.token)
  if (props.method === 'post') {
      fetch.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  }
  fetch.responseType = 'blob';
  fetch.onreadystatechange = () => {      
      if (fetch.readyState === 4 && fetch.status === 200) {
        // 使用 fetch.response.type==='application/json' 是文件失败的标记
        if(fetch.response.type==='application/json'){
            message.error('导出失败!')
            return 
        }
        const blob = new Blob([fetch.response], { type: 'application/vnd.ms-excel' });
        // const header = fetch.getResponseHeader('Content-Disposition');
        // Content-Disposition返回格式: attachment;filename=
        // const fileName = header.split('filename=')[1]
        // const decodeFileName = decodeURIComponent(fileName)
        const a = document.createElement('a');
        a.download = props.downloadName || '导出文件'
        a.href = URL.createObjectURL(blob);
        a.click();
      }else if(fetch.readyState === 4){
        message.error('导出失败!')
      }
  };
  switch (props.method) {
      case 'get':
          fetch.send()
          break;
      case 'post':
          fetch.send(JSON.stringify(props.data))
          break;
      default:
          break;
  }
}
