import React from 'react';
import { Modal, Form, Select, Input, Row, Col, DatePicker, Avatar, Checkbox, TimePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;
const FormItem = Form.Item;
const {RangePicker } = DatePicker;
class CreatePicture extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel, onCreate} = this.props; 
        return(
            <Modal
                title="Create a new Picture"
                visible={visible}
                onCancel={onCancel}
                width= {800}
                onOk ={onCreate}
                closable
                destroyOnClose ={true}
            >
               <Form
                    layout='vertical'
                >
                    <Row gutter={8}>
                        <Col xl={8} lg={8} md={24}>
                        <FormItem  label="Radio | Acts | Full Movies" hasFeedback>
                        {getFieldDecorator('type', {
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
                        <Col xl={8} lg={8} md={8}>
                        <FormItem 
                            label="Picture Version" >
                            {getFieldDecorator('pictureversion', {
                                rules: [{ required: true, message: 'Please input Version!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                    <Col xl={5} lg={5} md={8}>
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
                    <Col  xl={5} lg={5} md={8}>
                        <Form.Item
                        label="Out Time"
                        >
                        {getFieldDecorator('outtime', {
                            initialValue: moment('01:00:00','HH:mm:ss'),
                        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                        })(
                            <TimePicker />
                        )}
                        </Form.Item>
                    </Col>
                    <Col xl={5} lg={5} md={8}>
                        <FormItem  label="Date" hasFeedback>
                        {getFieldDecorator('thedate', {rules: [{type: 'object', required: true, message: 'Please select date!' }],})(
                        <DatePicker format='YYYY/MM/DD' />
                        )}
                        </FormItem>
                    </Col>
                    <Col xl={6} lg={5} md={8}>
                        <FormItem 
                            label="Notes" >
                            {getFieldDecorator('note', {
                                rules: [{ required: true, message: 'Please input note!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        </Col>
                    </Row>
			    </Form>
            </Modal>
        )
    }
}
const CreatePictureForm = Form.create({})(CreatePicture);
export default CreatePictureForm;