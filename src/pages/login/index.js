import React from "react";
import { connect } from 'react-redux';
import {login} from '../../redux/action/auth.action'
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
import 'antd/dist/antd.css';
import {FormWrapper} from './style';
import axios from 'axios';
const FormItem = Form.Item;
class FormLogin extends React.Component{
    
    handleSubmit = ()=>{
        const user = this.props.form.getFieldsValue();
        console.log(user)
        console.log(this.props)
        // this.props.form.validateFields((err,values)=>{
        //     if(!err){
        //         message.success(`${userInfo.userName} password :${userInfo.userPwd}`)
        //     }
        // })

        // axios({
        //     url:'http://localhost:3031/users',
        //     method: 'get',
        //   }).then((res) => {
        //     const person = res.data
        //     console.log(typeof(person[0].password));
        //     console.log(typeof(logValue.userPwd));
        //     if (person[0].userName === logValue.userName && person[0].password === parseInt(logValue.userPwd)){
        //         message.success('login Success');
        //         window.location.href = `/#/admin`;
        //     }else if(person[0].userName !== logValue.userName){
        //         message.error('wrong userName');
        //     }else if(person[0].password !== logValue.userPwd){
        //         message.error('wrong password');
        //     }
              
        //   }, (res) =>{
        //     console.log(res);
        //     message.error('error');
        //   } )
        this.props.login(user, (res) => {
            console.log(res)
            if (res.data.success) {
                this.props.history.push('/#/admin');
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <FormWrapper >
                <Card title="Log in" style={{marginTop:10}}>
                    <Form style={{width:230}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'username cannot be null'
                                        },
                                        {
                                            // min:5,max:10,
                                            message:'length is not long enough'
                                        },
                                        {
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:'username must be letter and num'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="Please input username" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required:true,
                                            message:'password cannot be null'
                                        },
                                        {
                                            // min:5,max:10,
                                            message:'length is not long enough'
                                        },
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="Please input password" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName:'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>Remember</Checkbox>
                                )
                            }
                            <a href="#" style={{float:'right'}}>Forget Password</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>Login</Button>
                        </FormItem>
                    </Form>
                </Card>
            </FormWrapper>
        );
    }
}
const finalFormLogin = Form.create()(FormLogin);
const mapDispathToProps = (dispatch) => {
    return {
        login:() => dispatch(login())
    }
}
const mapStateToProps = () => {}
export default connect(null, mapDispathToProps)(finalFormLogin);