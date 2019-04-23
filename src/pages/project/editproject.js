import React from 'react';
import { Modal, Form, Select, Input, Row, Col, DatePicker} from 'antd';
import {getproject} from '../../redux/action/project.action'
import {connect} from 'react-redux';
const { Option } = Select;
const FormItem = Form.Item;
const {RangePicker } = DatePicker;
class EidtProject extends React.Component{
    
    componentDidMount(){
        if(!this.props.project) {
            this.props.getproject(this.props.projectId);
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel, projectId, onCreate} = this.props;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
          };
       
        return(
            <Modal
                title="Edit Project"
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
			    </Form>
            </Modal>
        )
    }
}
const EditProjectForm = Form.create({})(EidtProject);
export default connect(null, {getproject})(EditProjectForm);