import React, { Component, Fragment } from 'react';
import { Form, Input, Upload, Select, Button, Card } from 'antd';

import './BaseView.less';

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
    <Upload fileList={[]}>
      <div className='button_view'>
        <Button icon="upload">
          Change avatar
        </Button>
      </div>
    </Upload>
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
  componentDidMount() {
    this.setBaseInfo();
  }

  
  // 一开始的时候加载user信息

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser1[key] || null;
      form.setFieldsValue(obj);
    });
  };

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

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Card>
      <div className='baseView' >
        <div className='left'>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label='Email'>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'please input your email',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label='Username'>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'please input your name',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label='Profile'>
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
            </FormItem>
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
            <Button type="primary">
             Update Informatio
            </Button>
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
export default BaseViewForm;