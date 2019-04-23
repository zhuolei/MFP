import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import {
  List,
  Card,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Avatar,
  Modal,
  Form,
  message,
  Select,
  Empty
} from 'antd';
// import PageHeaderWrapper from '../../common/PageHeaderWrapper';
import {createproject} from '../../redux/action/projects.action'
import {connect} from 'react-redux';
import './worklist.less';
// withRouter可以包装任何自定义组件，将react-router 的 history,location,match 三个对象传入。 
// 无需一级级传递react-router 的属性，当需要用的router
// 属性的时候，将组件包一层withRouter，就可以拿到需要的路由信息
import {withRouter} from 'react-router-dom';
import CreateProjectForm from './createproject';
import EditProjectForm from './editproject';
import {getallusersinoneteam} from '../../redux/action/teamAuth.action'
import {getprojects} from '../../redux/action/projects.action'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const { Search,  } = Input;

class ProjectList extends PureComponent {
    state = { 
        visible: false, 
        done: false, 
        createProjectFormVisible: false,
        editProjectFormVisible: false,
        projectlist: [],
        projectlist2: [] 
    };
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const teamproject = [...(this.props.initialValues.teamProject||[])];
        const projectlist =[];
        teamproject.map(i => {
            projectlist.push(i.project);
        })
        this.setState({
                projectlist: [...(projectlist||[])],
                // projectlist2: [...(this.props.projects||[])]
            })
    }
    componentDidMount(){
        if(!this.props.projects) {
            this.props.getprojects(this.props.match.params.teamId);
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.projects !== this.props.projects) {
            console.log(nextProps)
            const teamProjectcopy = nextProps.initialValues||{}
            const teamproject = [...(teamProjectcopy.teamProject||[])];
            const projectlist =[];
            teamproject.map(i => {
                projectlist.push(i.project);
            })
            const list=[...(projectlist||[])]

            // this.setState({
            //     // projectlist: [...(this.props.projects||[])],
            //     // projectlist2: [...(this.props.projects||[])]
            // })
        }  
    }
    formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
    };
    // create project form
    showCreateProjectForm = () => {
        this.setState({
            createProjectFormVisible: true
        })
    }
    createProjectFormHandleCancel = () => {
        this.setState({
            createProjectFormVisible: false
        })
    }
    createProjectFormHandleCreate = () => {
        const form = this.projectForm.props.form;
        const userlist = this.projectForm.props.userlist;
        const formValue = this.projectForm.props.form.getFieldsValue();
        form.validateFieldsAndScroll((err) => {
            if (err) {
            return;
            }
            form.resetFields();
            this.setState({ createProjectFormVisible: false });
        });
        console.log(this.projectForm.props);
        console.log(formValue);
        const finalFormValue = {};
        finalFormValue.userProjectCreation =[];
        userlist.map(u => {
            let userrole = {};
            userrole.userId = u.id;
            userrole.commentrole = formValue[`commentrole${u.id}`]
            userrole.composerole1 = formValue[`composerole${u.id}`][0]
            userrole.composerole2 = formValue[`composerole${u.id}`][1]
            userrole.composerole3 = formValue[`composerole${u.id}`][2]
            userrole.mediarole = formValue[`mediarole${u.id}`]
            userrole.notificationrole = formValue[`notificationrole${u.id}`]
            finalFormValue.userProjectCreation.push(userrole)
        })
        finalFormValue.teamId = this.props.match.params.teamId
        finalFormValue.filmtitle = formValue.filmtitle
        finalFormValue.season =formValue.season
        finalFormValue.episodetitle = formValue.episodetitle
        finalFormValue.episodenumber = formValue.episodenumber
        finalFormValue.codename = formValue.codename
        finalFormValue.projecttype = formValue.projecttype
        finalFormValue.timecoderate = formValue.timecoderate
        finalFormValue.lanesintimeline = formValue.lanesintimeline
        finalFormValue.scoringstartdate = moment(formValue.scoringdaterange[0]).format('YYYY-MM-DD') || null
        finalFormValue.scoringdeadline = moment(formValue.scoringdaterange[1]).format('YYYY-MM-DD') || null
        finalFormValue.orchestrationdeadline = moment(formValue.orchestrationdeadline).format('YYYY-MM-DD') || null
        finalFormValue.deliverydeadline = moment(formValue.deliverydeadline).format('YYYY-MM-DD') || null
        console.log(formValue[`commentrole${14}`])
        console.log(finalFormValue);
        this.props.createproject(finalFormValue, (res) => {
            if (res.data.success) {
                message.success('Project is created successly');
                this.setState({
                    createProjectFormVisible: false,
                    projectlist: [...this.state.projectlist,res.data.project ],
                }) 
            } else {
                message.error('Error');
            }
            
        })
    }
    // 添加
    showModal = () => {
        this.setState({
          visible: true,
          current: undefined,
        });
    };
    // 显示编辑
    showEditModal = item => {
        this.setState({
            editProjectFormVisible: true,
            current: item,
        });
    };
    eidtProjectFormHandleCancel = () => {
        this.setState({
            editProjectFormVisible: false
        })
    }
    eidtProjectFormHandleCreate = () => {

    }
    // 显示delete
    showDeleteModal = (item) => {
        Modal.confirm({
        title: 'Delete Project',
        content: 'Are you sure want to delete this project',
        okText: 'Confirm',
        cancelText: 'Cancel',
        onOk: () => this.deleteItem(item.id),
        });
    };
    handleDone = () => {
        setTimeout(() => this.addBtn.blur(), 0);
        this.setState({
          done: false,
          visible: false,
        });
    };
    
    handleCancel = () => {
        setTimeout(() => this.addBtn.blur(), 0);
        this.setState({
            visible: false,
        });
    };
    
    handleSubmit = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        const { current } = this.state;
        const id = current ? current.id : '';
    
        setTimeout(() => this.addBtn.blur(), 0);
        form.validateFields((err, fieldsValue) => {
          if (err) return;
          this.setState({
            done: true,
          });
          dispatch({
            type: 'list/submit',
            payload: { id, ...fieldsValue },
          });
        });
    };
    render () {
        const { getFieldDecorator } = this.props.form;
        const { visible, done, current = {} } = this.state;
        const extraContent = (
            <div className="extraContent">
              <RadioGroup defaultValue="all">
                <RadioButton value="all">All</RadioButton>
                <RadioButton value="progress">Processing</RadioButton>
                <RadioButton value="waiting">Finished</RadioButton>
              </RadioGroup>
              <Search className="extraContentSearch" placeholder="Please Input" onSearch={() => ({})} />
            </div>
          );
        // const listData = [];
        // for (let i = 0; i < 23; i++) {
        // listData.push({
        //     href: 'http://ant.design',
        //     title: `ant design part ${i}`,
        //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //     description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        //     content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        // });
        // }
        // const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
        //     <div className="listContent">
        //       <div className="listContentItem">
        //         <span>Owner</span>
        //         <p>{owner}</p>
        //       </div>
        //       <div className="listContentItem">
        //         <span>Start Time</span>
        //         <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        //       </div>
        //       <div className="listContentItem">
        //         <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        //       </div>
        //     </div>
        // );
        const ListContent = ( { startdate, enddate, percent, status } ) => (
            <div className="listContent">
              <div className="listContentItem">
                <span>Start Date</span>
                <p>{startdate}</p>
              </div>
              <div className="listContentItem">
                <span>End Date</span>
                <p>{moment(enddate).format('YYYY-MM-DD')}</p>
              </div>
              <div className="listContentItem">
                <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
              </div>
            </div>
        );
        
        
        
        const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
        );
        const userlist =[];
        const initialValue = this.props.initialValues || {}
        const teamuser = initialValue.teamUsers || [];
        teamuser.map(i => {
            let user = {};
            user.id = i.user.id
            user.username = i.user.username
            user.teamRole = i.teamRole.type
            userlist.push(user)
        })
        // const projectlist =[]
        // const teamproject = this.props.initialValues.teamProject;
        // teamproject.map(i => {
        //     projectlist.push(i.project);
        // })
        return (
            
            <div className="standardList">
            {/* <Card>
                <p><pre>{JSON.stringify(this.props.initialValues.teamProject)}</pre></p>
                <p><pre>{JSON.stringify(this.props.projects)}</pre></p>
                <p><pre>{JSON.stringify(this.props.match.params.teamId)}</pre></p>
            </Card> */}
            <Card
                className="listCard"
                bordered={false}
                title="Project List"
                bodyStyle={{ padding: '0 32px 40px 32px' }}
                extra={extraContent}
                >
                <Button
                    type="dashed"
                    style={{ width: '100%', marginBottom: 8 }}
                    icon="plus"
                    onClick={this.showCreateProjectForm}
                    // ref 是什么
                    ref={component => {
                        /* eslint-disable */
                        this.addBtn = findDOMNode(component);
                        /* eslint-enable */
                    }}
                    >
                    Add a new Project
                </Button>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                    }}
                    dataSource={this.state.projectlist}
                    // footer={<div><b>Page</b>1</div>}
                    renderItem={item => (item !== null ? (
                        <List.Item
                            key={item.id}
                            actions={[
                                    <a
                                        onClick={e => {
                                        e.preventDefault();
                                        this.showEditModal(item.id);
                                        }}
                                    >
                                        edit
                                    </a>, 
                                    <a
                                        onClick={e => {
                                        e.preventDefault();
                                        this.showDeleteModal(item);
                                        }}
                                        >
                                        delete
                                     </a>,
                                    //  comment icon
                                    <IconText type="like-o" text="156" />, 
                                    <IconText type="message" text="2" />,
                                ]}
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<NavLink 
                                to={`/project/detail/${JSON.stringify({'teamId':`${this.props.match.params.teamId}`,'projectId':`${item.id}`})}`
                                }><span>{item.filmtitle}</span>&nbsp;<span>{item.season}</span>&nbsp;<span>{item.episodetitle}</span>&nbsp;<span>{item.episodenumber}</span></NavLink>}
                            description={<div><span>Code Name: {item.codename}</span>&nbsp;|&nbsp;<span>Project Type: {item.projecttype}</span>&nbsp;|&nbsp;<span>Time Code Rate: {item.timecoderate}</span>&nbsp;|&nbsp;<span>Lanes in Time Line: {item.lanesintimeline}</span></div>}
                            />
                            <ListContent startdate={item.scoringstartdate} enddate={item.scoringenddate} />
                        </List.Item>
                    ): (
                        <Empty/>
                    ))}
                />
            </Card>
             <CreateProjectForm 
                    wrappedComponentRef={(projectForm)=>{this.projectForm = projectForm;}}
                    visible={this.state.createProjectFormVisible}
                    onCancel={this.createProjectFormHandleCancel}
                    onCreate={this.createProjectFormHandleCreate}
                    userlist={userlist}
                />
            <EditProjectForm 
                    wrappedComponentRef={(eidtProjectForm)=>{this.eidtProjectForm = eidtProjectForm;}}
                    visible={this.state.editProjectFormVisible}
                    onCancel={this.eidtProjectFormHandleCancel}
                    onCreate={this.eidtProjectFormHandleCreate}
                    projectId={this.state.current}
                />
            </div>
            
        )
    }
}

const FinalProjectList = Form.create()(ProjectList);

// 1st parameter: application state
// 2st parameter: current component props
function mapStateToProps({teams,projects}, componentProps) {
    // console.log(componentProps.match);
    const team = teams ? teams.find(t => {
      return t.id === +componentProps.match.params.teamId;
    }) : null;
    // console.log(team)
    return {
        projects,
        teams,
        initialValues: team
    };
    // initialValues which will be on component props will be used as default values for redux-form
  }
export default withRouter(connect(mapStateToProps,{getallusersinoneteam,getprojects,createproject})(FinalProjectList));