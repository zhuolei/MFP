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
import styles from './worklist.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

const editAndDelete = (key, currentItem) => {
    if (key === 'edit') this.showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => this.deleteItem(currentItem.id),
      });
    }
};

const Info = ({ title, value, bordered }) => (
    <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
    </div>
);

const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: 50,
};

const MoreBtn = props => (
<Dropdown
    overlay={
    <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
        <Menu.Item key="edit">编辑</Menu.Item>
        <Menu.Item key="delete">删除</Menu.Item>
    </Menu>
    }
>
    <a>
    更多 <Icon type="down" />
    </a>
</Dropdown>
);
const { visible, done, current = {} } = this.state;

const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };
const extraContent = (
    <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="progress">Processing</RadioButton>
          <RadioButton value="waiting">Waiting</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
)


class ProjectList extends PureComponent {
    state = { visible: false, done: false };

    
    render () {

        return(
            <div>
                <div className={styles.standardList}>
                <Card bordered={false}>
                    <Row>
                    <Col sm={8} xs={24}>
                        <Info title="To-do" value="8" bordered />
                    </Col>
                    <Col sm={8} xs={24}>
                        <Info title="本周任务平均处理时间" value="32分钟" bordered />
                    </Col>
                    <Col sm={8} xs={24}>
                        <Info title="本周完成任务数" value="24个任务" />
                    </Col>
                    </Row>
                </Card>

                <Card
                    className={styles.listCard}
                    bordered={false}
                    title="标准列表"
                    style={{ marginTop: 24 }}
                    bodyStyle={{ padding: '0 32px 40px 32px' }}
                    extra={extraContent}
                >
                    <Button
                    type="dashed"
                    style={{ width: '100%', marginBottom: 8 }}
                    icon="plus"
                    onClick={this.showModal}
                    ref={component => {
                        /* eslint-disable */
                        this.addBtn = findDOMNode(component);
                        /* eslint-enable */
                    }}
                    >
                    添加
                    </Button>
                    <List
                    size="large"
                    rowKey="id"
                    // loading={loading}
                    pagination={paginationProps}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                        actions={[
                            <a
                            onClick={e => {
                                e.preventDefault();
                                this.showEditModal(item);
                            }}
                            >
                            编辑
                            </a>,
                            <MoreBtn current={item} />,
                        ]}
                        >
                        <List.Item.Meta
                            avatar={<Avatar src={item.logo} shape="square" size="large" />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.subDescription}
                        />
                        <ListContent data={item} />
                        </List.Item>
                    )}
                    />
                </Card>
                </div>
                <Modal
                title={done ? null : `任务${current ? '编辑' : '添加'}`}
                className={styles.standardListForm}
                width={640}
                bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
                destroyOnClose
                visible={visible}
                {...modalFooter}
                >
                {getModalContent()}
                </Modal>
            </div>
        );
    }
}
export default ProjectList;