import React from 'react';
import { Modal, Form, Select, Input } from 'antd';
const { Option } = Select;
const FormItem = Form.Item;

class InviteMember extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel, onInvite} = this.props;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
          };
        return(
            <Modal
                title="Invite a new Member"
                visible={visible}
                onCancel={onCancel}
                onOk = {onInvite}
            >
               <Form>
                    <FormItem 
                        {...formItemLayout}
                        label="Username" >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input username!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem 
                        {...formItemLayout}
                        label="E-mail" >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            },{ 
                                required: true, message: 'Please input your email!' 
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Team Privilege"
                        hasFeedback
                        >
                        {getFieldDecorator('teamRoleId', {
                            rules: [
                            { required: true, message: 'Please select a privilege!' },
                            ],
                        })(
                            <Select placeholder="Please select a privilege">
                            <Option value="2">Team Manager</Option>
                            <Option value="3">Team Member</Option>
                            </Select>
                        )}
                    </FormItem>
			    </Form>
            </Modal>
        )
    }
}
const InviteMemberForm = Form.create({})(InviteMember);
export default InviteMemberForm;