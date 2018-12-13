import React, { Component } from 'react';
import { Form,Input, Upload, Icon, Button, Modal, Card} from 'antd';
import 'antd/dist/antd.css';
import axios from '../../axios';
const FormItem = Form.Item
class Project extends Component{
	state = {
		teams:[],
		isShowCreateTeam: false
	}
	
	handleCreateTeam = () => {
		this.setState({
			isShowCreateTeam: true
		})
	}
	handleSubmit = ()=>{
        let cityInfo = this.cityForm.props.form.getFieldsValue();
		console.log(cityInfo);
	}
	render(){  
		const teamsList = this.state.teams.map((item, index) => (
			<Card style={{marginBottom:10}}
				title = {item}>
			</Card>
		));

		return (
			<div>
				<Card>
				<Button type="primary" onClick={this.handleCreateTeam}>Create Team</Button>
				{teamsList}
				</Card>
				<Modal 
                    title="create"
                    visible={this.state.isShowCreateTeam}
                    onCancel={()=>{
                        this.setState({
                            isShowCreateTeam:false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <CreateTeamForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
                </Modal>
				
			</div>
		);
	}
}

class CreateTeamForm extends Component{
	render(){
		const { getFieldDecorator }  =this.props.form;
		return (
			<Form layout="vertical" label>
				<FormItem label="Team name" >
				{getFieldDecorator('teamname', {
					rules: [{ required: true, message: 'Please input Team name!' }],
				})(
					<Input />
				)}
				</FormItem>
			</Form>
		)
	}
}
CreateTeamForm = Form.create({})(CreateTeamForm);
export default Project;