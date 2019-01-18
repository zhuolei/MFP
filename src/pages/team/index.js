import React from 'react';
import './index.less';
import { List, Button, Card, Icon, Tooltip, Avatar, Modal, Form, Input, message } from 'antd';
import numeral from 'numeral';
import {createteam, getTeams} from '../../redux/action/teamAuth.action';
import {connect} from 'react-redux';
const FormItem = Form.Item
class TeamProject extends React.Component {
    state = { visible: false, teamlist: [] };
    // constructor(){
    //     this.props.getTeams();
    // }
    componentDidMount() {
        if(!this.props.teams) {
            this.props.getTeams();
            console.log(this.props.teams);
            this.setState({
                teamlist: this.props.teams
            })
            // console.log(this.props.getTeams())
        }
    }
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
        
        const list=this.props.teams||[];
        // for (let i = 0; i < 23; i++) {
        //     list.push({
        //         id: `${i}`,
        //         title: `Team${i}`,
        //         activeUser: `${i*100}`,
        //         newUser: `${i*200}`,
        //     })
        // }
        // const {
        //     list: {},
        //     loading,
        //     form,
        // } = this.props;
        const CardInfo = ({ membersNumber, ProjectsNumber }) => (
            <div className='cardInfo'>
              <div>
                <p>Person No</p>
                <p>{membersNumber}</p>
              </div>
              <div>
                <p>Project No</p>
                <p>{ProjectsNumber}</p>
              </div>
            </div>
        ); 
        return (
            <div className='cardList'>
                <List
                    rowKey="id"
                    // loading={loading}
                    // style={{ marginTop: 24 }}
                    grid={{ gutter: 24, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
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
                            <Card.Meta 
                            avatar={<Avatar size="small" src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />} 
                            title={item.teamname} />
                                <div className='cardItemContent'>
                                <CardInfo
                                    membersNumber={item.membersNumber}
                                    ProjectsNumber={numeral(item.id).format('0,0')}
                                />
                                </div>
                        </Card>
                        <div><pre>{JSON.stringify(item)}</pre></div>
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
const mapStateToProps = state => {
    console.log(state);
    return {
        teams: state.teams,
    }
}

export default connect(mapStateToProps, {createteam, getTeams})(TeamProject);