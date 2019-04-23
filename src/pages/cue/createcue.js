import React from 'react';
import { Modal, Form, Select, Input, Row, Col, DatePicker, Avatar, Checkbox,TimePicker } from 'antd';
import moment from 'moment';
const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;
const {RangePicker } = DatePicker;
class CreateCue extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel, onCreate} = this.props;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
          };
        
    //     const userslist = userlist.map((user, index) => 
    //       <Row gutter={8} key={index}>
    //             {/* <p><pre>{JSON.stringify(user.key)}</pre></p> */}
    //           <Col xl={5} lg={5} md={5} xs={12} >
    //             <FormItem label="Team Member">
    //                     <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
    //                     <span><strong>{user.username}</strong></span>
    //             </FormItem>
    //           </Col>
    //           <Col xl={3} lg={3} md={3} xs={12}>
    //             <FormItem label="teamrole">
    //                     <span><strong>{user.teamRole}</strong></span>
    //             </FormItem>
    //           </Col>
    //           <Col xl={3} lg={3} md={3} xs={12}>
    //           <Form.Item
    //             label="Roles"
    //             >
    //             {getFieldDecorator(`composerole${user.key}`, {
    //                 // initialValue: ["1"],
    //             })(
    //                 <Checkbox.Group >
    //                     <Row>
    //                     <Checkbox value="Composer">Composer</Checkbox>
    //                     </Row>
    //                     <Row>
    //                     <Checkbox value="Orchestrator">Orchestrator</Checkbox>
    //                     </Row>
    //                     <Row>
    //                     <Checkbox value="Mixer">Mixer</Checkbox>   
    //                     </Row> 
    //                 </Checkbox.Group>
    //             )}
    //             </Form.Item>
    //           </Col>
    //           <Col xl={4} lg={4} md={4} xs={12}>
    //             <FormItem  label="Media Access" hasFeedback>
    //             {getFieldDecorator(`mediarole${user.key}`, {
    //                 rules: [{ 
    //                     required: true, message: 'Please select a type' 
    //                 }],
    //             })(
    //                 <Select placeholder="Please select a type">
    //                 <Option value="1">Play & Download</Option>
    //                 <Option value="2">Play Only</Option>
    //                 <Option value="3">Download Only</Option>
    //                 <Option value="4">None</Option>
    //                 </Select>
    //             )}
    //             </FormItem>
    //             </Col>
    //             <Col xl={4} lg={4} md={4} xs={12}>
    //             <FormItem  label="Comments" hasFeedback>
    //             {getFieldDecorator(`commentrole${user.key}`, {
    //                 rules: [{ 
    //                     required: true, message: 'Please select a type' 
    //                 }],
    //             })(
    //                 <Select placeholder="Please select a type">
    //                 <Option value="1">Can Comment</Option>
    //                 <Option value="2">Read Only</Option>
    //                 <Option value="3">None</Option>
    //                 </Select>
    //             )}
    //             </FormItem>
    //             </Col>
    //             <Col xl={5} lg={5} md={5} xs={12}>
    //             <FormItem  label="Recieve Email Notifications" hasFeedback>
    //             {getFieldDecorator(`notificationrole${user.key}`, {
    //                 rules: [{ 
    //                     required: true, message: 'Please select a type' 
    //                 }],
    //             })(
    //                 <Select placeholder="Please select a type">
    //                 <Option value="1">All Notifications</Option>
    //                 <Option value="2">New Cues Only</Option>
    //                 <Option value="3">None</Option>
    //                 </Select>
    //             )}
    //             </FormItem>
    //             </Col>
    //       </Row>
    //   )
        const moment1 = moment('00:00:00','HH:mm:ss');
        const moment2 = moment('01:00:00','HH:mm:ss');
        return(
            <Modal
                title="Create a new Cue"
                visible={visible}
                onCancel={onCancel}
                width= {1080}
                onOk ={onCreate}
                closable
                destroyOnClose ={true}
            >
               <Form
                    layout='vertical'
                >
                    <Row gutter={20}>
                    <Col xl={10} lg={10} md={24}>
                    <FormItem 
                        
                        label="Title" >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input Title!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    </Col>
                    <Col xl={5} lg={5} md={24}>
                    <FormItem  
                        label="Picture" >
                        {getFieldDecorator('picture', {
                            rules: [
                            { 
                                required: true, message: 'Please input picture!' 
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    </Col>
                    <Col xl={3} lg={5} md={8}>
                        <Form.Item
                        label="In Time"
                        >
                        {getFieldDecorator('intime', {
                            initialValue: moment('00:00:00','HH:mm:ss'),
                        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                        })(
                            <TimePicker />
                        )}
                        </Form.Item>
                    </Col>
                    <Col  xl={3} lg={5} md={8}>
                        <Form.Item
                        label="Out Time"
                        >
                        {getFieldDecorator('outtime', {
                            initialValue: moment('00:10:00','HH:mm:ss'),
                        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                        })(
                            <TimePicker />
                        )}
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={20}>
                    <Col xl={3} lg={3} md={6}>
                    <FormItem 
                        label="Cue No." >
                        {getFieldDecorator('cuenumber', {
                            rules: [{ 
                                // required: true, 
                                // message: 'Please input cuenumber!' 
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    </Col>
                    <Col xl={3} lg={3} md={6}>
                    <FormItem  
                        label="Version" >
                        {getFieldDecorator('version', {
                            rules: [
                            { 
                                // required: true, 
                                message: 'Please input Version!' 
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    </Col>
                    <Col xl={6} lg={5} md={6}>
                    <FormItem  
                        label="Scene #" >
                        {getFieldDecorator('scene', {
                            rules: [
                            { 
                                // required: true,
                                 message: 'Please input scene!' 
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    </Col>
                    <Col xl={6} lg={5} md={6}>
                    <FormItem  
                        label="Temp" >
                        {getFieldDecorator('temp', {
                            rules: [
                            { 
                                // required: true, 
                                message: 'Please input temp!' 
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    </Col>
                    <Col xl={6} lg={6} md={6}>
                        <FormItem  label="Theme" hasFeedback>
                        {getFieldDecorator('theme', {
                            rules: [{ 
                                // required: true, 
                                message: 'Please select a theme' 
                            }],
                        })(
                            <Select placeholder="Please select a theme">
                            <Option value="red" >Red</Option>
                            <Option value="blue">Blue</Option>
                            <Option value="green">Green</Option>
                            <Option value="gold">Gold</Option>
                            </Select>
                        )}
                        </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col  xl={6} lg={6} md={6}>
                        <FormItem  label="Use" hasFeedback>
                        {getFieldDecorator('use', {
                            rules: [{ 
                                // required: true, 
                                message:'please select'  
                            }],
                        })(
                            <Select placeholder="Please select">
                            <Option value="Background Instrumental">Background Instrumental</Option>
                            <Option value="Background Vocal">Background Vocal</Option>
                            <Option value="Visual Instrumental">Visual Instrumental</Option>
                            <Option value="Visual Vocal">Visual Vocal</Option>
                            <Option value="Main Title">Main Title</Option>
                            <Option value="End Title">End Title</Option>
                            <Option value="Logo">Logo</Option>
                            </Select>
                        )}
                        </FormItem>
                        </Col>
                        <Col  xl={6} lg={6} md={6}>
                        <FormItem  label="Priority" hasFeedback>
                        {getFieldDecorator('priority', {
                            rules: [{ 
                                // required: true, 
                                message: 'Please select a priority' 
                            }],
                        })(
                            <Select placeholder="Please select a priority">
                            <Option value="Low">Low</Option>
                            <Option value="Medium">Medium</Option>
                            <Option value="High">High</Option>
                            </Select>
                        )}
                        </FormItem>
                        </Col>
                        <Col  xl={6} lg={6} md={6}>
                        <FormItem  label="Status" hasFeedback>
                        {getFieldDecorator('status', {
                            rules: [{ 
                                // required: true, 
                                message: 'Please select a status' 
                            }],
                        })(
                            <Select placeholder="Please select a lane">
                            <Option value="To write">To Write</Option>
                            <Option value="In Progress">In Progress</Option>
                            <Option value="Re-write">Re-write</Option>
                            <Option value="Revise">Revise</Option>
                            <Option value="Composed">Composed</Option>
                            <Option value="Approved">Approved</Option>
                            <Option value="Orchestrate">Orchestrate</Option>
                            <Option value="Record">Record</Option>
                            <Option value="Mix">Mix</Option>
                            <Option value="Stems">Stems</Option>
                            <Option value="Completed">Completed</Option>
                            <Option value="Source">Source</Option>
                            <Option value="On Hold">On Hold</Option>
                            <Option value="Omit">Omit</Option>
                            </Select>
                        )}
                        </FormItem>
                        </Col>
                        <Col  xl={6} lg={6} md={6}>
                        <FormItem  label="Sub Status" hasFeedback>
                        {getFieldDecorator('substatus', {
                            rules: [{ 
                                // required: true, 
                                message: 'Please select a substatus' 
                            }],
                        })(
                            <Select placeholder="Please select a lane">
                            <Option value="Awaiting Notes">Awaiting Notes</Option>
                            <Option value="Confirm">Confirm</Option>
                            <Option value="Delivered">Delivered</Option>
                            <Option value="Re-spot">Re-spot</Option>
                            <Option value="To Be Presented">To Be Presented</Option>
                            <Option value="Tracked">Tracked</Option>
                            </Select>
                        )}
                        </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                    <FormItem  
                        label="Notes" 
                        height={100}>
                        {getFieldDecorator('notes')(
                            <TextArea rows={4} />
                        )}
                    </FormItem>
                    
                    </Row>

			    </Form>
            </Modal>
        )
    }
}
const CreateCueForm = Form.create({})(CreateCue);
export default CreateCueForm;