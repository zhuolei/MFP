import React,{ Component } from 'react';
import { Row,Col } from "antd"
import './index.less'
import Util from '../../utils/utils'

export default class InnerHeader extends Component{
    state={};
    componentWillMount(){
        this.setState({
            userName:'LeoDong'
        })
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
    }
    render(){
        return(
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                            <span>Welcome，{this.state.userName}</span>
                            <a href="#">Log out</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">Main</Col>
                    <Col span="20" className="weather">
                        <span className="date">{this.state.sysTime}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}