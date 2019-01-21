import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
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
  DatePicker,
  Select,
} from 'antd';
// import PageHeaderWrapper from '../../common/PageHeaderWrapper';
import Result from '../../common/Result';
import {connect} from 'react-redux';
import './worklist.less';
// withRouter可以包装任何自定义组件，将react-router 的 history,location,match 三个对象传入。 
// 无需一级级传递react-router 的属性，当需要用的router
// 属性的时候，将组件包一层withRouter，就可以拿到需要的路由信息
import {withRouter} from 'react-router-dom';
import CreateProjectForm from './createproject';
import {getallusersinoneteam} from '../../redux/action/teamAuth.action'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

class ProjectList extends PureComponent {
    state = { 
        visible: false, 
        done: false, 
        createProjectFormVisible: false,
    };
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        // if(!this.props.teams) {
        //     this.props.getallusersinoneteam();
        // }
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
        const formValue = this.projectForm.props.form.getFieldsValue();
        form.validateFieldsAndScroll((err) => {
            if (err) {
            return;
            }
            form.resetFields();
            this.setState({ createTeamFormVisible: false });
        });
        console.log(formValue);
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
            visible: true,
            current: item,
        });
    };
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
        const listData = [];
        for (let i = 0; i < 23; i++) {
        listData.push({
            href: 'http://ant.design',
            title: `ant design part ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
        }
        const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
            <div className="listContent">
              <div className="listContentItem">
                <span>Owner</span>
                <p>{owner}</p>
              </div>
              <div className="listContentItem">
                <span>开始时间</span>
                <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
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
        
        const teamuser = this.props.initialValues.teamUsers;
        teamuser.map(i => {
            let user = {};
            user.username = i.user.username
            user.teamRole = i.teamRole.type
            userlist.push(user)
        })

        return (
            
            <div className="standardList">
            <Card>
                <p><pre>{JSON.stringify(this.props.initialValues.teamUsers)}</pre></p>
                <p><pre>{JSON.stringify(userlist)}</pre></p>
            </Card>
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
                    dataSource={listData}
                    footer={<div><b>Page</b>1</div>}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                    <a
                                        onClick={e => {
                                        e.preventDefault();
                                        this.showEditModal(item);
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
                                    <IconText type="like-o" text="156" />, 
                                    <IconText type="message" text="2" />,
                                ]}
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                            />
                            <ListContent data={item} />
                        </List.Item>
                    )}
                />
            </Card>
            
           

             <CreateProjectForm 
                    wrappedComponentRef={(projectForm)=>{this.projectForm = projectForm;}}
                    visible={this.state.createProjectFormVisible}
                    onCancel={this.createProjectFormHandleCancel}
                    onCreate={this.createProjectFormHandleCreate}
                    userlist={userlist}
                />
            </div>
            
        )
    }
}

const FinalProjectList = Form.create()(ProjectList);

// 1st parameter: application state
// 2st parameter: current component props
function mapStateToProps({teams}, componentProps) {
    console.log(componentProps.match);
    const team = teams ? teams.find(t => {
      return t.id === +componentProps.match.params.teamId;
    }) : null;
    console.log(team)
    return {
        teams,
        initialValues: team
    };
    // initialValues which will be on component props will be used as default values for redux-form
  }
export default withRouter(connect(mapStateToProps,{getallusersinoneteam})(FinalProjectList));