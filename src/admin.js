import React,{ Component } from 'react';
import { Row, Col } from 'antd';
import InnerHeader from './common/innerHeader';
import Footer from './common/footer';
import NavLeft from './common/navLeft';
import './style/common.less';
import Home from './pages/home';

export default class Admin extends Component{

    render(){
        return(
            <Row className="container">
                <Col span="5" className="nav-left">
                    <NavLeft/>
                </Col>
                <Col span="19" className="main">
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