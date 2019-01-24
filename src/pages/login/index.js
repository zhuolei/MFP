import React from "react";
import { connect } from 'react-redux';
import {login} from '../../redux/action/auth.action'
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
import { getTeams } from '../../redux/action/teamAuth.action';
import 'antd/dist/antd.css';
import {FormWrapper} from './style';
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
                // this.props.history.push('/#/admin/home');
                this.props.getTeams();
                window.location.href = '/#/admin/home'
            } else if (!res.data.success) {
                message.error('username or password is wrong')
            }
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <FormWrapper>
                <Card title="Log in" style={{marginTop:20}}>
                    <Form style={{width:300}}>
                        <FormItem>
                            {
                                getFieldDecorator('username',{
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
                                getFieldDecorator('password', {
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
                        <FormItem >
                            <Button style={{width:'100%'}} type="primary" onClick={this.handleSubmit}>Login</Button>
                        </FormItem>
                    </Form>
                </Card>
            </FormWrapper>
        );
    }
}
const finalFormLogin = Form.create()(FormLogin);

export default connect(null, {login,getTeams})(finalFormLogin);