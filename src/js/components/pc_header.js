/**
 * Created by angelks on 2017/11/13.
 */
import React from 'react';
import { Row, Col } from 'antd';
import { Menu, Icon, Tabs,
         message,
         Form,
         Input,
         Button,
         Checkbox,
        Modal
} from 'antd';

import '../../css/pc.css';
import {Link} from "react-router-dom";
// import Modal from "antd/lib/modal/Modal.d";


const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'toutiao',
            modalVisible: false,
            action: 'login',
            hasLogined:false,
            userNickName: '',
            userid: 0
        };
    }

    handleClick = (e) => {
        if(e.key == "register") {
            this.setState({current:'register'});
            this.setModalVisible(true);
        } else {
            console.log('click ', e);
            this.setState({
                current: e.key,
            });
        }
    };
    // handleSubmit(e) {
    //     //向api提交数据
    //     e.preventDefault();
    //     var myFetchOptions = {
    //         method: 'GET'
    //     };
    //     var formData = this.props.form.getFieldValue();
    //     console.log(formData);
    // };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var myFetchOptions = {
                    method: 'GET'
                };
                fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&r_userName="
                    +values.r_userName+
                    "&r_password="+values.r_password+
                    "&r_confirmPassword"+values.r_confirmPassword,
                    myFetchOptions)
                    .then(response=>response.json())
                    .then(json=>{
                        this.setState({userNickName:json.NickUserName,userid:json.UserId});

                    });
                message.success("请求成功");
                this.setModalVisible(false);
            }
        });
    };
    // fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
    //     + "&username="+formData.userName+"&password="+formData.password
    //     +"&r_userName=" + formData.r_userName + "&r_password="
    //     + formData.r_password + "&r_confirmPassword="
    //     + formData.r_confirmPassword, myFetchOptions)
    setModalVisible(value) {
        this.setState({modalVisible: value});
    };

    callback(key) {
        if(key == 1) {
            this.setState({action: 'login'});
        } else if(key == 2) {
            this.setState({action: 'register'});
        }
    };
    render() {
        let {getFieldProps} = this.props.form;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const userShow = this.state.hasLogined
            ?
            <Menu.Item key="logout" className="register">
                <Button type="primary">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                {/*<Link target="_blank">*/}
                    <Button type="dashed" htmlType="button">个人中心</Button>
                {/*</Link>*/}
                &nbsp;&nbsp;
                <Button type="ghost">退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" className="register">
                <Icon type="appstore"/>注册/登录
            </Menu.Item>
        return (
            <header>
               <Row>
                   <Col span={4}></Col>
                   <Col span={4}>
                       <a href="/" className="logo">
                           <img src="./logo.png" alt="logo" />
                           <span>ReactNews</span>
                       </a>
                   </Col>
                   <Col span={12}>
                       <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
                           <Menu.Item key="toutiao">
                               <Icon type="appstore"/>头条
                           </Menu.Item >
                           <Menu.Item key="shehui">
                               <Icon type="appstore"/>社会
                           </Menu.Item>
                           <Menu.Item key="guoji">
                               <Icon type="appstore"/>国际
                           </Menu.Item>
                           <Menu.Item key="keji">
                               <Icon type="appstore"/>科技
                           </Menu.Item >
                           <Menu.Item key="tiyu">
                               <Icon type="appstore"/>体育
                           </Menu.Item>
                           <Menu.Item key="shishang">
                               <Icon type="appstore"/>时尚
                           </Menu.Item>
                           {userShow}
                       </Menu>

                       <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
                           <Tabs type="card" onChange={this.callback.bind(this)}>
                               <TabPane tab="登录" key="1">
                                   <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                   <FormItem label="账户">
                                       {getFieldDecorator('userName')(
                                           <Input placeholder="请输入您的账户"/>
                                       )}
                                   </FormItem>
                                   <FormItem label="密码">
                                           {getFieldDecorator('password')(
                                               <Input type="password" placeholder="请输入您的密码"/>
                                           )}
                                   </FormItem>
                                       <Button type="primary" htmlType="submit">登录</Button>
                                   </Form>

                               </TabPane>
                               <TabPane tab="注册" key="2">
                                   <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                       <FormItem label="账户">
                                           {getFieldDecorator('r_userName')(
                                               <Input placeholder="请输入您的账户"/>
                                           )}
                                       </FormItem>
                                       <FormItem label="密码">
                                           {getFieldDecorator('r_password')(
                                               <Input type="password" placeholder="请输入您的密码"/>
                                           )}
                                       </FormItem>
                                       <FormItem label="确认密码">
                                           {getFieldDecorator('r_confirmPassword')(
                                               <Input type="password" placeholder="请再次输入你的密码"/>
                                           )}
                                       </FormItem>
                                       <Button type="primary" htmlType="submit">注册</Button>
                                   </Form>
                                   {/*<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>*/}
                                       {/*<FormItem label="账户">*/}
                                           {/*{getFieldDecorator('userName', {*/}
                                               {/*rules: [{ required: true, message: '请输入你的用户名!' }],*/}
                                           {/*})(*/}
                                               {/*<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />*/}
                                           {/*)}*/}
                                           {/*/!*<Input placeholder="请输入您的账号" {...getFieldProps('r_userName')} />*!/*/}
                                       {/*</FormItem>*/}

                                       {/*/!*<FormItem label="密码">*!/*/}
                                           {/*/!*<Input  type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')} />*!/*/}
                                       {/*/!*</FormItem>*!/*/}
                                       {/*/!*<FormItem label="确认密码">*!/*/}
                                           {/*/!*<Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')} />*!/*/}
                                       {/*/!*</FormItem>*!/*/}
                                       {/*<Button type="primary" htmlType="submit">注册</Button>*/}
                                   {/*</Form>*/}
                               </TabPane>
                           </Tabs>
                       </Modal>
                   </Col>
                   <Col span={4}></Col>
               </Row>
            </header>
        );
    };
}

export default PCHeader = Form.create({})(PCHeader);