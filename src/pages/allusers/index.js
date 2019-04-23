import React, { Component }from "react";
import {connect} from 'react-redux';
import {allusers} from '../../redux/action/allusers.action';
import { Table, Card } from 'antd';
import './index.less';
class Users extends Component {
    componentDidMount() {
        if(!this.props.allUsers) {
            this.props.allusers();
        }
    }
    render() {
        const userslist = [...(this.props.allUsers || [])]
        const columns = [{
            title: "Username",
            dataIndex: 'username',
            width: 150,
            fixed: 'left',
        },{
            title: "Email",
            dataIndex: 'email',
        },{
            title: "Password",
            dataIndex: 'password',
        },
        {
            title: "UserDetail",
            dataIndex: 'userDetail',
            width: 100,
            fixed: 'right',
        }
    ]
        return(
            <Card>
                <Table 
                        columns={columns}
                        dataSource={userslist}
                        scroll={{ x: 1000, y: 500 }}
                        // expandedRowRender={record => <p style={{ margin: 0 }}>this is notes</p>}
                    >
                    </Table>
            </Card>
        )
    }
}
const mapStateToProps = state => {
    return {
        allUsers : state.allUsers
    }
}
export default connect(mapStateToProps,{allusers})(Users);