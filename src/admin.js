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
                <Col span="3" className="nav-left">
                    <NavLeft/>
                </Col>
                <Col span="21" className="main">
                    <InnerHeader/>
                    <Row className="content">
                        <Home />
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        );
    }
}