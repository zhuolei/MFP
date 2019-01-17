import React from 'react';
import './index.less';
import { List, Button, Card, Icon, Tooltip, Avatar, Modal, Form, Input } from 'antd';
import numeral from 'numeral';

const FormItem = Form.Item
class TeamProject extends React.Component {
    state = { visible: false };
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
                <Modal 
                    title="create"
                    visible={this.state.visible}
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <CreateTeamForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
                </Modal>
            </div>
        )
    }
}
class CreateTeamForm extends React.Component{
	render(){
		const { getFieldDecorator }  =this.props.form;
		return (
			<Form layout="vertical" >
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
export default TeamProject;