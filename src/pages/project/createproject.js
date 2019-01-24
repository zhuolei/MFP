import React from 'react';
import { Modal, Form, Select, Input, Row, Col, DatePicker, Avatar, Checkbox } from 'antd';
import {moment} from 'moment';

const { Option } = Select;
const FormItem = Form.Item;
const {RangePicker } = DatePicker;
class CreateProject extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel, userlist, onCreate} = this.props;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
          };
        let key = 0;
        userlist.map(u => {
            if(!u.key){
            u.key = u.id;
            }
        })
        const userslist = userlist.map((user, index) => 
          <Row gutter={8} key={index}>
                {/* <p><pre>{JSON.stringify(user.key)}</pre></p> */}
              <Col xl={5} lg={5} md={5} xs={12} >
                <FormItem label="Team Member">
                        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                        <span><strong>{user.username}</strong></span>
                </FormItem>
              </Col>
              <Col xl={3} lg={3} md={3} xs={12}>
                <FormItem label="teamrole">
                        <span><strong>{user.teamRole}</strong></span>
                </FormItem>
              </Col>
              <Col xl={3} lg={3} md={3} xs={12}>
              <Form.Item
                label="Roles"
                >
                {getFieldDecorator(`composerole${user.key}`, {
                    // initialValue: ["1"],
                })(
                    <Checkbox.Group >
                        <Row>
                        <Checkbox value="Composer">Composer</Checkbox>
                        </Row>
                        <Row>
                        <Checkbox value="Orchestrator">Orchestrator</Checkbox>
                        </Row>
                        <Row>
                        <Checkbox value="Mixer">Mixer</Checkbox>   
                        </Row> 
                    </Checkbox.Group>
                )}
                </Form.Item>
              </Col>
              <Col xl={4} lg={4} md={4} xs={12}>
                <FormItem  label="Media Access" hasFeedback>
                {getFieldDecorator(`mediarole${user.key}`, {
                    rules: [{ 
                        required: true, message: 'Please select a type' 
                    }],
                })(
                    <Select placeholder="Please select a type">
                    <Option value="1">Play & Download</Option>
                    <Option value="2">Play Only</Option>
                    <Option value="3">Download Only</Option>
                    <Option value="4">None</Option>
                    </Select>
                )}
                </FormItem>
                </Col>
                <Col xl={4} lg={4} md={4} xs={12}>
                <FormItem  label="Comments" hasFeedback>
                {getFieldDecorator(`commentrole${user.key}`, {
                    rules: [{ 
                        required: true, message: 'Please select a type' 
                    }],
                })(
                    <Select placeholder="Please select a type">
                    <Option value="1">Can Comment</Option>
                    <Option value="2">Read Only</Option>
                    <Option value="3">None</Option>
                    </Select>
                )}
                </FormItem>
                </Col>
                <Col xl={5} lg={5} md={5} xs={12}>
                <FormItem  label="Recieve Email Notifications" hasFeedback>
                {getFieldDecorator(`notificationrole${user.key}`, {
                    rules: [{ 
                        required: true, message: 'Please select a type' 
                    }],
                })(
                    <Select placeholder="Please select a type">
                    <Option value="1">All Notifications</Option>
                    <Option value="2">New Cues Only</Option>
                    <Option value="3">None</Option>
                    </Select>
                )}
                </FormItem>
                </Col>
          </Row>
      )
        return(
            <Modal
                title="Create a new Project"
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
                    <Row gutter={8}>
                    <Col xl={10} lg={10} md={24}>
                    <FormItem 
                        
                        label="Film Title" >
                        {getFieldDecorator('filmtitle', {
                            rules: [{ required: true, message: 'Please input Film Title!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    </Col>
                    <Col xl={5} lg={5} md={24}>
                    <FormItem  
                        label="Season" >
                        {getFieldDecorator('season', {
                            rules: [
                            { 
                                required: true, message: 'Please input Season!' 
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    </Col>
                    </Row>
                    <Row gutter={8}>
                    <Col xl={10} lg={10} md={24}>
                    <FormItem 
                        label="Episode Title" >
                        {getFieldDecorator('episodetitle', {
                            rules: [{ required: true, message: 'Please input Episode Title!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    </Col>
                    <Col xl={5} lg={5} md={24}>
                    <FormItem  
                        label="Episode No." >
                        {getFieldDecorator('episodenumber', {
                            rules: [
                            { 
                                required: true, message: 'Please input Episode No.!' 
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    </Col>
                    <Col xl={5} lg={5} md={24}>
                    <FormItem  
                        label="Code Name" >
                        {getFieldDecorator('codename', {
                            rules: [
                            { 
                                required: true, message: 'Please input Code Name!' 
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col xl={8} lg={8} md={24}>
                        <FormItem  label="Project Type" hasFeedback>
                        {getFieldDecorator('projecttype', {
                            rules: [{ 
                                required: true, message: 'Please select a type' 
                            }],
                        })(
                            <Select placeholder="Please select a type">
                            <Option value="radio">Radio</Option>
                            <Option value="acts">Acts</Option>
                            <Option value="fullmovies">Full Movies</Option>
                            </Select>
                        )}
                        </FormItem>
                        </Col>
                        <Col  xl={8} lg={8} md={24}>
                        <FormItem  label="Timecode Rate" hasFeedback>
                        {getFieldDecorator('timecoderate', {
                            rules: [{ 
                                required: true, message: 'Please select a timecode rate' 
                            }],
                        })(
                            <Select placeholder="Please select a rate">
                            <Option value="24">24</Option>
                            <Option value="25">25</Option>
                            <Option value="30">30</Option>
                            </Select>
                        )}
                        </FormItem>
                        </Col>
                        <Col  xl={8} lg={8} md={24}>
                        <FormItem  label="Lanes in Timeline" hasFeedback>
                        {getFieldDecorator('lanesintimeline', {
                            rules: [{ 
                                required: true, message: 'Please select a lane' 
                            }],
                        })(
                            <Select placeholder="Please select a lane">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            </Select>
                        )}
                        </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col xl={8} lg={8} md={24}>
                        <FormItem  label="Scoring Date Range" hasFeedback>
                        {getFieldDecorator('scoringdaterange', {rules: [{ type: 'array', required: true, message: 'Please select date!' }],})(
                        <RangePicker format='YYYY/MM/DD' />
                        )}
                        </FormItem>
                        </Col>
                        <Col  xl={8} lg={8} md={24}>
                        <FormItem  label="Orchestration Deadline" hasFeedback>
                        {getFieldDecorator('orchestrationdeadline', {
                            rules: [{ 
                                type: 'object', required: true, message: 'Please select date!' 
                            }],
                        })(
                            <DatePicker format='YYYY/MM/DD'/>
                        )}
                        </FormItem>
                        </Col>
                        <Col  xl={8} lg={8} md={24}>
                        <FormItem  label="Delivery Deadline" hasFeedback>
                        {getFieldDecorator('deliverydeadline', {
                            rules: [{ 
                                type: 'object', required: true, message: 'Please select date!' 
                            }],
                        })(
                            <DatePicker format='YYYY/MM/DD'/>
                        )}
                        </FormItem>
                        </Col>
                    </Row>
                    {userslist}
			    </Form>
            </Modal>
        )
    }
}
const CreateProjectForm = Form.create({})(CreateProject);
export default CreateProjectForm;