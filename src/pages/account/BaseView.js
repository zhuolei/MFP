import React, { Component, Fragment } from 'react';
import { Form, Input, message, Select, Button, Card } from 'antd';
import {connect} from 'react-redux';
import './BaseView.less';
import {updateuser} from './../../redux/action/auth.action';
// import PhoneView from './PhoneView';
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className='avatar_title'>
      Avatar
    </div>
    <div className='avatar'>
      <img src={avatar} alt="avatar" />
    </div>
    {/* <Upload fileList={[]}>
      <div className='button_view'>
        <Button icon="upload">
          Change avatar
        </Button>
      </div>
    </Upload> */}
  </Fragment>
);


const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};


const currentUser1 = {
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  email: '1@gmail.com',
  username: 'leo',
};

class BaseView extends Component {
  
  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser1.avatar) {
      return currentUser1.avatar;
    }
    const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  getViewDom = ref => {
    this.view = ref;
  };
  handleSubmit =(e)=> {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const value = {}
      const loggedIn = this.props.loggedIn || {}
      value.password = this.props.form.getFieldsValue();
      value.username = loggedIn.username;
      value.email = loggedIn.email;
      this.props.updateuser(value,(res) => {
        if (res.data.success) {
            message.success('success');
        } else {
            message.error('Error');
        }
      })
    })
    
  }
  render() {
    const {
      form: { getFieldDecorator }, handleSubmit
    } = this.props;
    const loggedIn = this.props.loggedIn || {}
    return (
      <Card style={{height: '400px'}}>
      <div className='baseView' >
        <div className='left'>
          <Form layout="vertical" hideRequiredMark>
            <FormItem label='User Name'>
              <span><strong>{loggedIn.username}</strong></span>
            </FormItem>
            <FormItem label='User Email'>
              <span><strong>{loggedIn.email}</strong></span>
            </FormItem>
            {/* <FormItem label='New password'>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'please input new password',
                  },{
                    min: 6,
                  }
                ],
              })(<Input />)}
            </FormItem> */}
            {/* <FormItem label='Profile'>
              {getFieldDecorator('profile', {
                rules: [
                  {
                    required: true,
                    // message: ,
                  },
                ],
              })(
                <Input.TextArea
                  placeholder='Brief introduction to yourself'
                  rows={4}
                />
              )}
            </FormItem> */}
            {/* <FormItem label={formatMessage({ id: 'app.settings.basic.phone' })}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.phone-message' }, {}),
                  },
                  { validator: validatorPhone },
                ],
              })(<PhoneView />)}
            </FormItem> */}
            {/* <Button type="primary" onClick= {this.handleSubmit}>
             Update Informatio
            </Button> */}
          </Form>
        </div>
        <div className='right'>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
      </Card>
    );
  }
}

const BaseViewForm = Form.create()(BaseView);
const mapStateToProps = state => {
  return {
    loggedIn : state.loggedIn,
  }
}
export default connect(mapStateToProps,{updateuser})(BaseViewForm);