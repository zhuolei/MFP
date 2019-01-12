import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
  Divider,
} from 'antd';
// import PageHeaderWrapper from '../../common/PageHeaderWrapper';
import Result from '../../common/Result';
import './worklist.less';


const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

class ProjectList extends PureComponent {
    state = { visible: false, done: false };
    formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
    };
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
        
        const getModalContent = () => {
        if (done) {
            return (
            <Result
                type="success"
                title="操作成功"
                description="一系列的信息描述，很短同样也可以带标点。"
                actions={
                <Button type="primary" onClick={this.handleDone}>
                    知道了
                </Button>
                }
                className="formResult"
            />
            );
        }
        
        return (
            <Form onSubmit={this.handleSubmit}>
            <FormItem label="Project Name" {...this.formLayout}>
                {getFieldDecorator('title', {
                rules: [{ required: true, message: 'please input project name' }],
                initialValue: current.title,
                })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="开始时间" {...this.formLayout}>
                {getFieldDecorator('createdAt', {
                rules: [{ required: true, message: '请选择开始时间' }],
                initialValue: current.createdAt ? moment(current.createdAt) : null,
                })(
                <DatePicker
                    showTime
                    placeholder="请选择"
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ width: '100%' }}
                />
                )}
            </FormItem>
            <FormItem label="任务负责人" {...this.formLayout}>
                {getFieldDecorator('owner', {
                rules: [{ required: true, message: '请选择任务负责人' }],
                initialValue: current.owner,
                })(
                <Select placeholder="请选择">
                    <SelectOption value="付晓晓">付晓晓</SelectOption>
                    <SelectOption value="周毛毛">周毛毛</SelectOption>
                </Select>
                )}
            </FormItem>
            <FormItem {...this.formLayout} label="产品描述">
                {getFieldDecorator('subDescription', {
                rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
                initialValue: current.subDescription,
                })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
            </FormItem>
            </Form>
        );
        };
        
        const modalFooter = done
            ? { footer: null, onCancel: this.handleDone }
            : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

        
        const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
        );
        return (
           
            <div className="standardList">
            <Card
                className="listCard"
                bordered={false}
                title="Work List"
                style={{ marginTop: 24 }}
                bodyStyle={{ padding: '0 32px 40px 32px' }}
                extra={extraContent}
                >
                <Button
                    type="dashed"
                    style={{ width: '100%', marginBottom: 8 }}
                    icon="plus"
                    onClick={this.showModal}
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
            {/* 控制visible true or false让modal显示 */}
            <Modal
                title={done ? null : `${current ? 'Edit' : 'Add'}Project`}
                className="standardListForm"
                width={640}
                bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
                destroyOnClose
                visible={visible}
                {...modalFooter}
                >
                {getModalContent()}
            </Modal>
            </div>
            
        )
    }
}
const FinalProjectList = Form.create()(ProjectList);
export default FinalProjectList;