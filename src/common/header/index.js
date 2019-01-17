import React, { Component } from 'react';
import { Form, Input, Upload, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal, message} from 'antd';
import {
    HeaderWrapper, 
    Logo,
    Addition,
} from './style';
import axios from 'axios';
import {register} from '../../redux/action/auth.action'
import {connect} from 'react-redux';
const FormItem = Form.Item;
const Option = Select.Option;


const RegisterForm = Form.create()(
  class extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    // 比较两次密码是否相等
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent');
      } else {
        callback();
      }
    }
    // 比较两次密码是否相等
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
    //上传图片

    getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
    // 读取图片对象
    
    handleChange = (info) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => this.setState({
          userImg: imageUrl,
          loading: false,
        }));
      }
    }
    
  
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = this.props.form;

      //表单布局
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };

      // 手机号区号
      // const prefixSelector = getFieldDecorator('prefix', {
      //   initialValue: '86',
      // })(
      //   <Select style={{ width: 70 }}>
      //     <Option value="86">+86</Option>
      //     <Option value="87">+87</Option>
      //   </Select>
      // );
      return (
        <Modal
          visible={visible}
          title="Create a new account"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="horizontal">
            <FormItem 
               {...formItemLayout}
              label="username:"
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input the username' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="E-mail:"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Password:"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Confirm Password:"
            >
              {getFieldDecorator('confirmpassword', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>
            {/* <FormItem
              {...formItemLayout}
              label="Phone Number:"
            >
              {getFieldDecorator('phonenumber', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(
                //addonBefore={prefixSelector}
                <Input style={{ width: '100%' }} />
              )}
            </FormItem> */}
            <FormItem
              {...formItemLayout}
              label="Picture:"
            >
              {getFieldDecorator('userimg')(
                <Upload
                  className="avatar-uploader"
                  listType="picture-card"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  onChange={this.handleChange}
                >
                {this.state.userImg?<img style={{width: "128px", height: "128px"}} src={this.state.userImg}/> : <Icon type="plus" />}
                </Upload>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);
class Header extends Component {
    state = {
        visible: false,
      };
    //打开界面
    showModal = () => {
      this.setState({ visible: true });
    }

    handleCancel = () => {
      this.setState({ visible: false });
    }
    // 发送请求
    // request = () => {
    //   let baseUrl = 'http://localhost:3030';
    //   axios.post(baseUrl + '/users').then((res) => {
    //     console.log(res);
    //   })
    // }
    // 创建表单
    handleCreate = () => {
      const API_URL = process.env.PMP_API_URL;
      const form = this.formRef.props.form;
      const regValue = this.formRef.props.form.getFieldsValue();
      // console.log(regValue);
      console.log(API_URL)
      form.validateFieldsAndScroll((err, values) => {
          if (err) {
          return;
          }

          // console.log('Received values of form: ', values);
          form.resetFields();
          this.setState({ visible: false });
      });
      this.props.register(regValue, (res) => {
        if (res.data.success) {
          message.success('Register Success');
          this.setState({
            visible: false
          })
        } else if (!res.data.success && res.data.code === 1001) {
          message.error('Username has already been used');
        } else {
          message.error('failure');
        }
      })
        
        // if (res.data.success) {
        //   message.success('Register Success');
        //   this.setState({
        //     visible: false
        //   })
        // }
        
      

      // axios.post(`http://localhost:8080/users/register`,regValue, {withCredentials: true})
      //     .then((response) => {
      //       console.log(response)
      //       message.success('Register Success');
      //       this.setState({
      //         visible: false
      //       })
      //   }, (response) =>{
      //     console.log(response);
      //     message.error('error');
      //   } )
      // axios({
      //   url:'http://localhost:8080/users/register',
      //   method: 'post',
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   data:JSON.stringify(regValue),
      //   dataType: "json"
      // }).then((response) => {
      //     console.log(response)
      //     message.success('Register Success');
      //     this.setState({
      //       visible: false
      //     })
      // }, (response) =>{
      //   console.log(response);
      //   message.error('error');
      // } )
      // this.request();
      // console.log(regValue);
    }

    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }

    render() {
        return (
            <HeaderWrapper>
                <Logo>PMP</Logo>
                <Addition style={{marginTop: 'auto',
                                  marginBottom: 'auto',
                                  height: '65px', 
                                  }}>
                    <Button style={{     
                                    float: "right",
                                    height: "40px",
                                    top:'20%',
                                    // marginTop: 'auto',
                                    // marginBottom: 'auto',
                                    // marginTop: "14px",
                                    marginRight: "40px",
                                    padding: "0 20px",
                                    lineHeight: "38px",
                                    borderRadius: "19px",
                                    }} onClick={this.showModal}>Register</Button>
                    <RegisterForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    />
                </Addition>
            </HeaderWrapper>
        )
    }
}

export default connect(null, {register})(Header);

