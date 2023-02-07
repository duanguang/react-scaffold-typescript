/** 全屏 */
const fullScreen = () => {
    const el = document.body;
    const rfs = el['requestFullScreen'] || el['webkitRequestFullScreen'] || el['mozRequestFullScreen'] || el['msRequestFullscreen'];

    if (rfs) {
        rfs.call(el);
    }
}

/** 退出全屏 */
const exitScreen = () => {
    const el = document;
    const cfs = el['cancelFullScreen'] || el['webkitCancelFullScreen'] || el['mozCancelFullScreen'] || el['msExitFullscreen'];

    if (cfs) {
        cfs.call(el);
    }
}

/** 判断当前是否全屏 */
const isFullScreen = () => {
    return document['isFullScreen'] || document['mozFullScreen'] || document['webkitIsFullScreen'] || document['msFullscreenElement']
}

/** 全屏操作工具库 */
export const FULL_SCREEN = {
    fullScreen,
    exitScreen,
    isFullScreen,
}
