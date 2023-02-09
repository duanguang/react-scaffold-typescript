export const getPath = (path: string,mode: 'browser' | 'hash' = 'browser') => {
    let base_name = ''
    if (mode === 'browser') {
        if (process.env.NODE_ENV === 'dev') {
            if (!window.__POWERED_BY_QIANKUN__) {
                return `/app/proj${path}`; //在初始化项目后根据项目名称调整
            }
        } else {
            if (window.__POWERED_BY_QIANKUN__) {
                base_name = '/static/admin' // 发布环境路径配置
            }
        }
        return `${base_name}${path}`;
    }
    if (mode === 'hash') {
        return `${base_name}${path}`;
    }
}