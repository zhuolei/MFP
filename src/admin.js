import React,{ Component } from 'react';
import { Row, Col, Layout, Sider } from 'antd';
import InnerHeader from './common/innerHeader';
import Footer from './common/footer';
import NavLeft from './common/navLeft';
import './style/common.less';
import Home from './pages/home';
import {connect} from 'react-redux';
class Admin extends Component{
    constructor(){
        super();
        this.state = {
            navCol: 5,
            mainCol: 19,
        }
    }
    render(){
        return(
            // <Layout>
            // <Sider
            // trigger={null}
            // collapsible
            // collapsed={this.state.collapsed}
            // >
            // <NavLeft/>
            // </Sider>
            // <Layout>
            // <InnerHeader/>
            // {this.props.children}
            // <Footer/>
            // </Layout>
            // </Layout>
            <Row className="container">
                <Col xl={this.props.navCol} className="nav-left" lg={0} md={0} sm={0} xs={0}>
                    <NavLeft/>
                </Col>
                <Col xl={this.props.mainCol} className="main" lg={24} md={24} sm={24} xs={24}>
                    <InnerHeader/>
                    <Row className="content">
                    {/* 用在router里 */}
                    {this.props.children}
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        );
    }
}
const mapStateToProps = state => {
    return {
        navCol: state.switchMenu.navCol,
        mainCol: state.switchMenu.mainCol,
    }
}
export default connect(mapStateToProps)(Admin)