import React from 'react';
import './index.less';
import styles from './index.modules.less';
const mattera = require('../../assets/images/matter_a.png');
const matterb = require('../../assets/images/matter_b.png');
const matterc = require('../../assets/images/matter_c.png');
const matterd = require('../../assets/images/matter_d.png');
/** demo 页面 */
export const Login = () => {
    return <div className={ `legions-login ${styles['modules-less']}`}>
        <div className="todo">
            <div className="title">待办</div>
            <div className="list">
                <div className="item">
                    <img src={mattera}></img>
                </div>
                <div className="item">
                    <img src={matterb}></img>
                </div>
                <div className="item">
                    <img src={matterc}></img>
                </div>
                <div className="item">
                    <img src={matterd}></img>
                </div>
            </div>
        </div>
        <div className="catch-notice">
            <div className="title">异常通知</div>
            <div className="list">
                <div className="item">
                    <div className="contentL f28"><span>委托单号:</span>JCS20181226672123456789987654321</div>
                    <div className="contentR f24"><span>装车时间未到厂</span></div>
                    <div className="contentL f24 color-gray"><span>出口,跨境运输</span></div>
                    <div className="contentR f24 color-gray"><span>2018-12-29 11:44</span></div>
                </div>
                <div className="item">
                    <div className="contentL f28"><span>委托单号:</span>JCS201812266722</div>
                    <div className="contentR f24"><span>装车时间未到厂</span></div>
                    <div className="contentL f24 color-gray"><span>出口,跨境运输</span></div>
                    <div className="contentR f24 color-gray"><span>2018-12-29 11:44</span></div>
                </div>
                <div className="item">
                    <div className="contentL f28"><span>委托单号:</span>JCS201812266723</div>
                    <div className="contentR f24"><span>装车时间未到厂</span></div>
                    <div className="contentL f24 color-gray"><span>出口,跨境运输</span></div>
                    <div className="contentR f24 color-gray"><span>2018-12-29 11:44</span></div>
                </div>
                <div className="item">
                    <div className="contentL f28"><span>委托单号:</span>JCS201812266724</div>
                    <div className="contentR f24"><span>装车时间未到厂</span></div>
                    <div className="contentL f24 color-gray"><span>出口,跨境运输</span></div>
                    <div className="contentR f24 color-gray"><span>2018-12-29 11:44</span></div>
                </div>
            </div>
        </div>
    </div>
}