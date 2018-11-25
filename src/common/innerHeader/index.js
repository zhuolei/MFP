import React,{ Component } from 'react';
import { Row,Col } from "antd"
import './index.less'

export default class InnerHeader extends Component{
    componentWillMount(){
        this.setState({
            userName:'河畔一角'
        })
    }
    render(){
        return(
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                            <span>欢迎，{this.state.userName}</span>
                            <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">首页</Col>
                    <Col span="20" className="weather">
                        <span className="date">date</span>
                    </Col>
                </Row>
            </div>
        )
    }
}