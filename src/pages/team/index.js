import React from 'react';
import './index.less';
import { List, Button, Card, Icon, Tooltip, Avatar, Modal, Form, Input, message } from 'antd';
import numeral from 'numeral';
import {createteam} from '../../redux/action/teamAuth.action';
import {connect} from 'react-redux';
const FormItem = Form.Item
class TeamProject extends React.Component {
    state = { visible: false };
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () =>{
        const form = this.teamForm.props.form;
        const formValue = this.teamForm.props.form.getFieldsValue();
        console.log(formValue);
        form.validateFieldsAndScroll((err) => {
            if (err) {
            return;
            }
            form.resetFields();
            this.setState({ visible: false });
        });
        this.props.createteam(formValue, (res) => {
            if (res.data.success) {
                message.success('Team is created successly');
                this.setState({
                    visible: false
                })
            } else if (!res.data.success && res.data.code === 4004) {
                message.error('Teamname has already been used');
            } else {
                message.error('Error');
            }
            
        })

    }
    showModal = () => {
        this.setState({
          visible: true,
          current: undefined,
        });
    };
    showEditModal = item => {
        this.setState({
            visible: true,
            current: item,
        });
    };
    render() {
        // const 
        const list=[];
        for (let i = 0; i < 23; i++) {
            list.push({
                id: `${i}`,
                title: `Team${i}`,
                activeUser: `${i*100}`,
                newUser: `${i*200}`,
            })
        }
        // const {
        //     list: {},
        //     loading,
        //     form,
        // } = this.props;
        const CardInfo = ({ activeUser, newUser }) => (
            <div className='cardInfo'>
              <div>
                <p>Person No</p>
                <p>{activeUser}</p>
              </div>
              <div>
                <p>Project No</p>
                <p>{newUser}</p>
              </div>
            </div>
        ); 
        return (
            <div className='cardList'>
                <List
                    rowKey="id"
                    // loading={loading}
                    // style={{ marginTop: 24 }}
                    grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                    dataSource={['', ...list]}
                    renderItem={item =>
                    item ? (
                        <List.Item key={item.id}>
                        <Card 
                            hoverable 
                            bodyStyle={{ paddingBottom: 20 }}
                            actions={[
                            <Tooltip title="Invite">
                                <Icon type="team" />
                            </Tooltip>,
                            <Tooltip title="Edit">
                                <Icon type="edit" />
                            </Tooltip>,
                            <Tooltip title="分享">
                                <Icon type="share-alt" />
                            </Tooltip>,
                            ]}
                            >
                            <Card.Meta avatar={<Avatar size="small" src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />} title={item.title} />
                                <div className='cardItemContent'>
                                <CardInfo
                                    activeUser={item.activeUser}
                                    newUser={numeral(item.newUser).format('0,0')}
                                />
                                </div>
                        </Card>
                        </List.Item>
                    ) : (
                        <List.Item>
                        <Button 
                            type="dashed" 
                            className='newButton'
                            onClick={this.showModal}
                            >
                            <Icon type="plus" /> Add a New Team
                        </Button>
                        </List.Item>
                    )
                    }
                />
               
                    <CreateTeamForm 
                        wrappedComponentRef={(teamForm)=>{this.teamForm = teamForm;}}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        />
               
            </div>
        )
    }
}
class CreateTeamForm extends React.Component{
	render(){
        const { getFieldDecorator }  =this.props.form;
        const { visible, onCancel, onCreate } = this.props;
		return (
            <Modal 
                title="create"
                visible={visible}
                onCancel={onCancel}
                onOk={onCreate}
            >
			<Form layout="vertical" >
				<FormItem label="Team name" >
				{getFieldDecorator('teamname', {
					rules: [{ required: true, message: 'Please input Team name!' }],
				})(
					<Input />
				)}
				</FormItem>
			</Form>
            </Modal>
		)
	}
}
CreateTeamForm = Form.create({})(CreateTeamForm);
export default connect(null, {createteam})(TeamProject);