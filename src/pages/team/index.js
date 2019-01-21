import React from 'react';
import './index.less';
import { Button, Card, Icon, Tooltip, Avatar, Modal, Form, Input, message, Row, Col, Spin } from 'antd';
import numeral from 'numeral';
import {createteam, getTeams, inviteUser, deleteTeam} from '../../redux/action/teamAuth.action';
import {connect} from 'react-redux';
import InviteMemberForm from './invitemember';
import { NavLink } from 'react-router-dom';
const FormItem = Form.Item
class TeamProject extends React.Component {
    
    state = { 
        createTeamFormVisible: false, 
        inviteMemberFormVisible: false,
        deleteTeamVisible: false,
        teamlist: [] ,
        currentTeam: null,
        deleteTeamIndex: null,
    };
    // constructor(){
    //     this.props.getTeams();
    // }
    componentWillMount() {
        this.setState({
                teamlist: ['',...(this.props.teams||[])]
            })
    }
    componentDidMount() {
        if(!this.props.teams) {
            this.props.getTeams();
            // console.log(this.props.teams); 值为Null
            // this.setState({
            //     teamlist: [...(this.props.teams||[])]
            // })
            // console.log(this.props.getTeams())
        }
        
    }
    //负责 初始化接受新的props
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        if (nextProps.teams !== this.props.teams) {
            const list=['',...(nextProps.teams||[])]
            this.setState({
                teamlist: list
            })
        }  
    }
    // componentWillUpdate(nextState) {
    //     this.state = nextState
    // }
    // 创建team
    handleCancel = () => {
        this.setState({ createTeamFormVisible: false });
    }
    handleCreate = () =>{
        const form = this.teamForm.props.form;
        const formValue = this.teamForm.props.form.getFieldsValue();
        form.validateFieldsAndScroll((err) => {
            if (err) {
            return;
            }
            form.resetFields();
            this.setState({ createTeamFormVisible: false });
        });
        this.props.createteam(formValue, (res) => {
            if (res.data.success) {
                message.success('Team is created successly');
                this.setState({
                    createTeamFormVisible: false
                })
            } else if (!res.data.success && res.data.code === 2001) {
                message.error('Teamname has already been used');
            } else {
                message.error('Error');
            }
            
        })

    }
    showModal = () => {
        this.setState({
            createTeamFormVisible: true,
        });
    };
    // delete team
    showDeleteModal = (index) => {
        this.setState({
            deleteTeamVisible: true,
            deleteTeamIndex: index,
        })
        
    }
    cancelDeleteModal = () => {
        this.setState({
            deleteTeamVisible: false,
        })
    }
    deleteTeamHandle = () => {
        const list = [...this.state.teamlist];
        const id = list[this.state.deleteTeamIndex].id;
        console.log(id);
        this.props.deleteTeam(id, (res) => {
            console.log(res)
            if (res.data.success) {
                message.success('Team is deleted successly');
                this.setState({
                    deleteTeamVisible: false,
                })
            } else {
                message.error('Error');
            }
        });
    }
    // invite teammember modal
    showInviteModal = (index) => {
        const list = [...this.state.teamlist];
        console.log(index);
        this.setState({
            inviteMemberFormVisible: true,
            currentTeam: list[index]
        });
        console.log(this.state.currentTeam);
        
    }
    inviteHandleCancel = () => {
        this.setState({ inviteMemberFormVisible: false });
    }
    inviteHandleCreate = () =>{
        const form = this.inviteTeamForm.props.form;
        const formValue = this.inviteTeamForm.props.form.getFieldsValue();
        const finalFormValue = {...formValue,teamId: this.state.currentTeam.id}
        console.log(finalFormValue);
        console.log(this.state.currentTeam.id)
        form.validateFieldsAndScroll((err) => {
            if (err) {
            return;
            }
            form.resetFields();
            this.setState({ inviteMemberFormVisible: false });
        });
        this.props.inviteUser(finalFormValue, (res) => {
            if (res.data.success) {
                message.success('User is invited successly');
                this.setState({
                    inviteMemberFormVisible: false
                })
            } else {
                message.error('Error');
            }
            
        })
    }
    // navigate project
    openProjects = item => {
        let teamId = item;
        window.location.href = `/#/admin/project/detail/${teamId}`
    }
    showEditModal = item => {
        this.setState({
            visible: true,
            current: item,
        });
    };
    render() {
        // const 
        
        // const list=['',...(this.props.teams||[])];
        // this.setState({
        //     teamlist : list
        // })
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
        const ModalTitle = () => (
            <Icon 
                type="exclamation-circle"
                theme="twoTone" twoToneColor="#eb2f96" 
            >
                Delete
            </Icon>
        )
        return (
            <div className='cardList'>
                <Row gutter={10} >
                {this.state.teamlist.map((item, index) => (
            item !== null ?(item!=='' ? (
            <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
            <Card 
                hoverable 
                bodyStyle={{ paddingBottom: 20 }}
                style={{marginBottom: 20}}
                actions={[
                <Tooltip title="Delete" onClick={this.showDeleteModal.bind(this, index)}>
                    <Icon type="delete" />
                </Tooltip>,
                <Tooltip title="Invite"  onClick={this.showInviteModal.bind(this, index)}>
                    <Icon type="team" />
                </Tooltip>,
                <Tooltip title="Edit">
                    <Icon type="edit" />
                </Tooltip>,
                <NavLink to={`/admin/project/detail/${item.id}`}>
                <Tooltip title="Project">
                    <Icon type="project" />
                </Tooltip>
                </NavLink>,
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
            
            </Col>
            ): (
                <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
                <Button 
                    type="dashed" 
                    className='newButton'
                    onClick={this.showModal}
                    >
                    <Icon type="plus" /> Add a New Team
                </Button>
                </Col>
            )
        ): (
            <Spin size="large" />
        )))}
                </Row>
                <InviteMemberForm
                wrappedComponentRef={(inviteTeamForm)=>{this.inviteTeamForm = inviteTeamForm;}}
                visible={this.state.inviteMemberFormVisible}
                onCancel={this.inviteHandleCancel}
                onInvite={this.inviteHandleCreate}
                />
                <CreateTeamForm 
                    wrappedComponentRef={(teamForm)=>{this.teamForm = teamForm;}}
                    visible={this.state.createTeamFormVisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Modal
                    visible={this.state.deleteTeamVisible}
                    onOk={this.deleteTeamHandle}
                    onCancel={this.cancelDeleteModal}
                    okText="Confirm"
                    cancelText="Cancel"
                    title = "Delete"
                >
                <Row >
                <Col span={2} >
                <Icon 
                type="exclamation-circle"
                theme="twoTone" twoToneColor="#eb2f96" 
                style={{marginBottom:10}}
                >
                </Icon>
                </Col>
                <Col span={22}>
                <p style={{marginBottom:10}}>Are you sure you want to delete team?</p>
                </Col>
                </Row>
                </Modal>
            </div>
        )
    }
}
class InviteMember extends React.Component{

    render(){
        return(
            <Modal>

            </Modal>
        )
    }
}
class CreateTeamForm extends React.Component{
	render(){
        const { getFieldDecorator }  =this.props.form;
        const { visible, onCancel, onCreate } = this.props;
		return (
            <Modal 
                title="Create a new team"
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
    
    return {
        teams: state.teams,
    }
}

export default connect(mapStateToProps, {createteam, getTeams, inviteUser, deleteTeam})(TeamProject);