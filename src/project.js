import React from 'react';
import {Layout, Icon,Card , Button} from 'antd';
import {connect} from 'react-redux';
import {Logo} from './projectstyle';
import {logout} from './redux/action/auth.action'
import {withRouter} from 'react-router-dom';
const {Header, Content, Footer} = Layout;

class Project extends React.Component {
    
    handleLogout = () => {
        this.props.logout((res) => {
            if (res.data && res.data.success) {
            //   this.props.history.push('/login');
            window.location.href = '/#/login'
            window.localStorage.clear();
            }
          });
    }
    render() {
        return(
            <Layout>
                <Header>
                <Logo>PMP</Logo> 
                <Button style={{     
                                    float: "right",
                                    height: "40px",
                                    top:'20%',
                                    // marginTop: 'auto',
                                    // marginBottom: 'auto',
                                    // marginTop: "14px",
                                    // marginRight: "10px",
                                    padding: "0 20px",
                                    lineHeight: "38px",
                                    borderRadius: "19px",
                                    }} onClick={this.handleLogout}>Logout</Button>
                </Header>
                <Content >
                <Icon type="ant-design" theme="twoTone" twoToneColor="#52c41a"/>
                    {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center', height:'500px' }}>    
                    PMP ©2019 Created by Leo Dong
                </Footer>
            </Layout>
        );
    }
}
const mapStateToProps = state => {
    // console.log(state.switchMenu)
    return {
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps,{logout})(Project);