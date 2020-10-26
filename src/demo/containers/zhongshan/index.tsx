import React from 'react';
import { WingBlank,WhiteSpace,Flex,Button,Modal,List,InputItem,TextareaItem,SegmentedControl,Checkbox,Result,Icon,Toast,Radio } from 'antd-mobile';
import myStyle from './index.modules.less';
import ZsMobileStore from '../../stores/zsMobileStore';
import { bind,observer } from 'legions/store-react';
import { ZsSumbieParames,getSave } from '../../services/zsMobile';

/* const title = require('../../assets/svg/title.svg'); */
import title from '../../assets/svg/title.svg'
import icon01 from '../../assets/svg/icon1.svg';
import icon02 from '../../assets/svg/icon2.svg';
import icon03 from '../../assets/svg/icon3.svg';
import icon05 from '../../assets/svg/icon5.svg';
import icon06 from '../../assets/svg/icon6.svg';
import icon07 from '../../assets/svg/icon7.svg';
import icon08 from '../../assets/svg/icon8.svg';
import icon1 from '../../assets/svg/item-icon1.svg';
import icon2 from '../../assets/svg/item-icon2.svg';
import icon3 from '../../assets/svg/item-icon3.svg';
import icon4 from '../../assets/svg/item-icon4.svg';
import icon5 from '../../assets/svg/item06-icon1.svg';
import icon6 from '../../assets/svg/item06-icon2.svg';
import icon7 from '../../assets/svg/item06-icon3.svg';
import icon8 from '../../assets/svg/item06-icon4.svg';
import icon9 from '../../assets/svg/item08-icon1.svg';
import icon10 from '../../assets/svg/item08-icon2.svg';
import icon11 from '../../assets/svg/item08-icon3.svg';
import icon12 from '../../assets/svg/item08-icon4.svg';
import bottom from '../../assets/svg/bottom.svg';
import content from '../../assets/svg/content.svg';
import content4 from '../../assets/svg/content4.svg';

interface IProps {
    store: ZsMobileStore
}

class IState {
    model: boolean;
    /* 申请产品 */
    productType: string = '1';
    productTypeLCM: string;
    /* 服务形式 */
    serviceType: number = 1
    /* 联系人 */
    linkmanName: string = null;
    /* 联系人电话 */
    phone: string = null;
    /* 备注 */
    message: string = null
}

@bind({ store: ZsMobileStore })
@observer
export default class Zhongshan extends React.Component<IProps,IState> {
    serviceType: number = 1
    productType: number;
    productTypeLCM: number;
    parames: ZsSumbieParames = new ZsSumbieParames()
    state = new IState()
    /* 显示弹窗 */
    showModal = (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            model: true,
        });
    }
    /* 关闭弹窗 */
    onClose = () => {
        this.setState({
            model: false,
        });
    }
    /* 提交 */
    handleSave = () => {
        this.parames.linkmanName = this.state.linkmanName;
        this.parames.message = this.state.message;
        this.parames.phone = this.state.phone;
        if (this.state.productType && !this.state.productTypeLCM) {
            this.parames.productType = '1'
        } else
            if (this.state.productTypeLCM && !this.state.productType) {
                this.parames.productType = '3'
            } else if (this.state.productType && this.state.productTypeLCM) {
                this.parames.productType = '1,3'
            }
        this.parames.serviceType = this.state.serviceType;
        console.log(this.parames)
        if (this.handleMessage() && this.handleForm()) {
            getSave(this.parames).then(res => {
                if (res && res.success) {
                    Toast.success('提交成功')
                    this.setState({
                        model: false,
                        message: null,
                        linkmanName: null,
                        phone: null,

                    });
                }
                else {
                    Toast.info('提交失败');
                }
            })
        }
    }
    /* 必填校验 */
    handleMessage = () => {
        if (!this.state.productType && !this.state.productTypeLCM && !this.parames.productType) {
            this.landTip('申请产品')
            return false
        }
        if (!this.serviceType) {
            this.landTip('服务形式')
            return false
        }
        if (!this.state.linkmanName) {
            this.landTip('联系人')
            return false
        }
        if (!this.state.phone) {
            this.landTip('联系人电话')
            return false
        }
        return true
    }
    /* 表单校验 */
    handleForm = () => {
        if (this.state.linkmanName.length < 2) {
            Toast.info('联系人请输入2个以上中文或英文字符')
            return false
        }
        // tslint:disable-next-line: no-magic-numbers
        if (this.state.phone.replace(/\s/g,'').length < 11) {
            Toast.info('电话号码格式不正确，固话请添加区号')
            return false
        }
        return true
    }
    /* 校验提示 */
    landTip = (Tip: string) => {
        return Toast.info(<span>请输入<span>{Tip}</span></span>)
    }
    /* 申请产品 */
    handleCheckout = (val) => {
        if (val.target.checked === true && val.target.children === '昊链SCM') {
            this.setState({
                productType: '1',
            })
        } else {
            this.setState({
                productType: null,
            })
        }
    }
    handleCheckoutLCM = (val) => {
        if (val.target.checked === true && val.target.children === '昊链LCM') {
            this.setState({
                productTypeLCM: '3',
            })
        } else {
            this.setState({
                productTypeLCM: null,
            })
        }
    }
    /* 选择服务产品 */
    handleRadio = (value) => {
        this.setState({
            serviceType: value,
        })
    }
    /* 输入联系人 */
    handleName = (value) => {
        this.setState({
            linkmanName: value,
        })
    }
    /* 输入联系人手机 */
    handleMobile = (value) => {
        this.setState({
            phone: value,
        })
    }
    /* 输入备注 */
    handleRemark = (value) => {
        this.setState({
            message: value,
        })
    }
    render() {
        let htmlDom = document.getElementsByTagName('html')[0]
        console.log(htmlDom)
        /* const { getFieldProps } = this.props.form; */
        return (
            <div>
                <div className={myStyle.zsBackground}>
                    <img style={{ height: '26px',width: '77px',padding: '24px 0 0 23px' }} src={title} />
                    <div className={myStyle.title}><span className={myStyle.circular}></span>昊链科技<span className={myStyle.circular}></span></div>
                    <div className={myStyle.title2}>助力中山工贸企业供应链数字化转型</div>
                    <img style={{ width: '100%',marginTop: '-1rem' }} src={bottom}></img>
                </div>
                <div className={myStyle.zsBackground2}>
                    <div className={myStyle.title2}>工贸企业发展机会和转型方向</div>
                    <img style={{ height: '13px',width: '144px' }} src={icon01} />
                    <WhiteSpace />
                    <Flex align="start" style={{ marginTop: '1.35rem' }}>
                        <div className={myStyle.border}>
                            <p><img style={{ width: '1.85rem' }} src={icon1} /></p>
                            政府支持
                        </div>
                        <div className={myStyle.border} style={{ margin: '0 3px 0 6px' }}>
                            <p><img style={{ width: '2.42rem',height: '1.84rem' }} src={icon2} /></p>
                            5G时代
                        </div>
                        <div className={myStyle.border} style={{ margin: '0 6px 0 3px' }}>
                            <p><img style={{ width: '2.07rem' }} src={icon3} /></p>
                            上云上平台
                        </div>
                        <div className={myStyle.border}>
                            <p><img style={{ width: '2rem',height: '1.8rem' }} src={icon4} /></p>
                            产业协同
                        </div>
                    </Flex>
                    <WhiteSpace />
                </div>
                <div className={myStyle.zsBackground3}>
                    <div className={myStyle.title3}>昊链供应链数字管理平台的价值</div>
                    <img style={{ height: '13px',width: '144px' }} src={icon02} />
                </div>
                <div className={myStyle.zsBackground4}>
                    <div className={myStyle.title4}>提供高质量供应链解决方案与落地服务</div>
                    <img style={{ height: '13px',width: '144px' }} src={icon03} />
                    <img style={{ width: '97%' }} src={content4} />
                    <WhiteSpace />
                    {/* <div className={myStyle.contentBg}>
                    </div> */}
                </div>
                <div className={myStyle.zsBackground5}>
                    <div className={myStyle.title5}>SAAS帮助工贸企业实现管理、效益双提升</div>
                    <img style={{ height: '13px',width: '144px' }} src={icon03} />
                    <div>
                        <WhiteSpace />
                        <img style={{ width: '95%' }} src={content}></img>
                        <WhiteSpace />
                        {/* <div className={myStyle.contentTop}>
                            <p style={{ paddingTop: '21px', fontFamily: 'PingFangSC, PingFangSC-Medium' }}>SCM供应链管理</p>
                        </div>
                        <p className={myStyle.dottedLeft}></p>
                        <div style={{ marginLeft: '37px', position: 'absolute' }} className={myStyle.dot}></div> 
                        <p className={myStyle.dottedRight}></p>
                        <div style={{ position: 'absolute', left: '89%' }} className={myStyle.dot}></div>
                        <div style={{ display: 'inline-flex' }}>
                            <div style={{ marginRight: '30px' }} className={myStyle.contentWhite}>
                                <p>DMS业务结算管理</p>
                            </div>
                            <div style={{ marginLeft: '30px' }} className={myStyle.contentWhite}>
                                <p>TMS运输管理系统</p>
                            </div>
                        </div>
                        <br />
                        <div className={myStyle.contentWhite}>
                            <p>WMS仓储管理系统</p>
                        </div>
                        <div style={{ marginTop: '-100px' }}>
                            <p className={myStyle.dottedCenter}></p>
                            <div style={{ position: 'relative', margin: '0 auto' }} className={myStyle.dot}></div>
                        </div> */}
                    </div>

                </div>
                <div className={myStyle.zsBackground6}>
                    <div className={myStyle.title6}>供应链数字化转型，不只是技术的升级</div>
                    <img style={{ height: '13px',width: '144px' }} src={icon05} />
                    <WhiteSpace />
                    <div style={{ display: 'inline-block' }}>
                        <Flex align="start">
                            <div className={myStyle.itemIcon} style={{ paddingTop: '8px' }}>
                                <img style={{ width: '4.53rem',height: '4.53rem' }} src={icon5} />
                                <div style={{ margin: '17px 0 0 23px' }}>供应链数字化转型的关键是解决业<br />
                            务问题</div>
                            </div>
                        </Flex>
                        <Flex align="start">
                            <div className={myStyle.itemIcon}>
                                <img style={{ width: '4.53rem',height: '4.53rem' }} src={icon6} />
                                <div style={{ margin: '17px 0 0 23px' }}>降低成本，提高利润总额，为开展<br />
                            创新或市场营销提供资金支持</div>
                            </div>
                        </Flex>
                        <Flex align="start">
                            <div className={myStyle.itemIcon}>
                                <img style={{ width: '4.53rem',height: '4.53rem' }} src={icon7} />
                                <div style={{ margin: '24px 0 0 23px' }}>提升客户/消费者体验</div>
                            </div>
                        </Flex>
                        <Flex align="start">
                            <div className={myStyle.itemIcon}>
                                <img style={{ width: '4.53rem',height: '4.53rem' }} src={icon8} />
                                <div style={{ margin: '24px 0 0 23px' }}>提高产品质量和响应速度</div>
                            </div>
                        </Flex>
                    </div>
                </div>
                <div className={myStyle.zsBackground7}>
                    <div className={myStyle.title7}>数字化转型方案效益</div>
                    <img style={{ height: '13px',width: '144px' }} src={icon06} />
                    <div style={{ paddingTop: '40px' }} className={myStyle.item7Bg}>
                        <div style={{ display: 'inline-flex' }}>
                            <div className={myStyle.circularLeft} >
                                <p>78%</p>
                            </div>
                            <div className={myStyle.circularCenter}>
                                <p>66%</p>
                            </div>
                            <div className={myStyle.circularRight}>
                                <p>51%</p>
                            </div>
                        </div>
                        <WhiteSpace />
                        <div style={{ display: 'inline-flex',maxWidth: '99%' }}>
                            <div className={myStyle.bgBorder} style={{ marginRight: '6px' }}>
                                <div className={myStyle.colorBorder}>
                                    <p>关务效能<br />提升78%</p>
                                </div>

                            </div>
                            <div className={myStyle.bgBorder} style={{ margin: '-1rem 6px 0 6px' }}>
                                <div className={myStyle.colorBorder} style={{ border: '1px solid #ff9b00' }}>
                                    <p style={{ color: '#ff9b00' }}>仓储效能<br />提升66%</p>
                                </div>
                            </div>
                            <div className={myStyle.bgBorder} style={{ marginLeft: '6px' }}>
                                <div className={myStyle.colorBorder} style={{ border: '1px solid #00c190' }}>
                                    <p style={{ color: '#00c190' }}>物流效能<br />提升51%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={myStyle.zsBackground8}>
                    <div className={myStyle.title8}>提供高效便捷的SAAS服务</div>
                    <img style={{ height: '13px',width: '144px' }} src={icon07} />
                    <WhiteSpace />
                    <Flex align="start" className={myStyle.flexIcon}>
                        <div className={myStyle.divIcon}>
                            <div><img style={{ width: '4.5rem' }} src={icon9} /></div>
                            费用更低
                        </div>
                        <div className={myStyle.divIcon} style={{ margin: '0 3px 0 6px' }}>
                            <div><img style={{ width: '4.5rem' }} src={icon10} /></div>
                            持续集成
                        </div>
                        <div className={myStyle.divIcon} style={{ whiteSpace: 'nowrap',margin: '0 6px 0 3px' }}>
                            <div><img style={{ width: '4.5rem' }} src={icon11} /></div>
                            持续迭代开发
                        </div>
                        <div className={myStyle.divIcon}>
                            <div><img style={{ width: '4.5rem' }} src={icon12} /></div>
                            技术支持
                        </div>
                    </Flex>
                </div>
                <div className={myStyle.zsBackground9}>
                    <div className={myStyle.title9}>成功案例</div>
                    <img style={{ height: '13px',width: '144px' }} src={icon08} />
                    <div className={myStyle.profit}>客户直接获益：<span style={{ color: '#FF9B00' }}>节省人力成本336万元/年</span></div>
                    <div className={myStyle.profit}>（按每人年6万元薪资成本计算）</div>
                    <div className={myStyle.tabeldiv}>
                        <table className={myStyle.table}>
                            <tr>
                                <th></th>
                                <th className={myStyle.thTitle}>使用平台前</th>
                                <th className={myStyle.thTitle}>使用平台后</th>
                                <th className={myStyle.thTitle}>原需人手</th>
                                <th className={myStyle.thTitle}>现需人手</th>
                            </tr>
                            <tr>
                                <th className={myStyle.thTitle}>仓储部</th>
                                <th className={myStyle.th1}>库内操作人员多，事物管理复杂；固定计划的备货影响月台效率</th>
                                <th className={myStyle.th1}>增加机器人及立体货仓，提高库存容量；月台预约及车辆进度异常提醒，随时调整备货</th>
                                <th className={myStyle.th}>50</th>
                                <th className={myStyle.th2}>35</th>
                            </tr>
                            <tr>
                                <th className={myStyle.thTitle}>关务部</th>
                                <th className={myStyle.th1}>人工管理多个货代及报关服务商；邮件/电话反复确认报关、仓单信息</th>
                                <th className={myStyle.th1}>通过SCM对接外部报关行、货代，关务单证一键传输，信息协同</th>
                                <th className={myStyle.th}>25</th>
                                <th className={myStyle.th2}>5</th>
                            </tr>
                            <tr>
                                <th className={myStyle.thTitle}>物流部</th>
                                <th className={myStyle.th1}>电话、微信、QQ沟通车辆在途订单，异常信息被动处理</th>
                                <th className={myStyle.th1}>系统自动预警，异常车单邮件/短信/数据屏等自动提醒，提前跟进处理</th>
                                <th className={myStyle.th}>30</th>
                                <th className={myStyle.th2}>12</th>
                            </tr>
                            <tr>
                                <th className={myStyle.thTitle}>安保部</th>
                                <th className={myStyle.th1}>装卸货车辆在闸口排长队，安保需逐一登记才放行</th>
                                <th className={myStyle.th1}>车辆信息与安保闸口对接，车辆到厂自动放行</th>
                                <th className={myStyle.th}>5</th>
                                <th className={myStyle.th2}>2</th>
                            </tr>
                        </table>
                    </div>
                </div>
                <Button style={{ position: 'fixed',bottom: '0',width: '100%' }} type="primary" onClick={this.showModal}>获得企业升级方案</Button><WhiteSpace />
                <WhiteSpace />
                <Modal
                    style={{ height: '23.25rem' }}
                    popup
                    visible={this.state.model}
                    closable={true}
                    onClose={this.onClose.bind(this)}
                    animationType="slide-up"
                    title={'填写信息，我们将针对您企业的具体情况给予升级方案'}>
                    <List renderHeader={() => null}>
                        <span className={myStyle.modalTitle}>申请产品：</span>
                        <Checkbox key={1} onChange={val => this.handleCheckout(val)} defaultChecked>
                            昊链SCM
                </Checkbox>
                        <Checkbox style={{ paddingLeft: '40px',fontFamily: 'PingFangSC, PingFangSC-Regular' }} key={3} onChange={val => this.handleCheckoutLCM(val)}>
                            昊链LCM
                </Checkbox >
                        <p className={myStyle.modalTitle1}>服务形式：</p>
                        {/* <SegmentedControl
                            values={['申请免费试用', '预约上门演示', '加入会员']}
                            selectedIndex={0}
                            onChange={this.handleRadio.bind(this)}
                            style={{ height: '40px', margin: '10px 10px 0 105px' }}
                        /> */}
                        <div style={{ paddingLeft: '105px',marginTop: '0.7rem' }}>
                            <button onClick={this.handleRadio.bind(this,1)} className={this.state.serviceType === 1 ? myStyle.btnModalAfter : myStyle.btnModal}>申请免费试用</button>
                            <button style={{ marginLeft: '8px' }} onClick={this.handleRadio.bind(this,2)} className={this.state.serviceType === 2 ? myStyle.btnModalAfter : myStyle.btnModal}>预约上门演示</button>
                            <br />
                            <button style={{ marginTop: '8px' }} onClick={this.handleRadio.bind(this,3)} className={this.state.serviceType === 3 ? myStyle.btnModalAfter : myStyle.btnModal}>加入会员</button>
                        </div>
                        <InputItem onChange={this.handleName}><span style={{ color: '#ff0000' }}>*</span>联系人：</InputItem>
                        <InputItem
                            /* {...getFieldProps('phone')} */
                            onChange={this.handleMobile}
                            // tslint:disable-next-line: no-magic-numbers
                            maxLength={11}
                            type="number">
                            <span style={{ color: '#ff0000' }}>*</span>联系人电话：</InputItem>
                        <InputItem
                            maxLength={50}
                            onChange={this.handleRemark}>留言：</InputItem>
                        <div style={{ display: 'inline-flex' }}>
                            <Button style={{ position: 'absolute',width: '50%',marginTop: '6px' }} onClick={this.onClose.bind(this)}>取消</Button>
                            <Button style={{ position: 'absolute',width: '50%',marginTop: '6px',right: '0' }} type="primary" onClick={this.handleSave.bind(this)}>提交</Button>
                        </div>
                    </List>
                </Modal>
            </div>
        )
    }
}