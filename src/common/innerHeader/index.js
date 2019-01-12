import React,{ Component } from 'react';
import { Row, Col, Button, Icon } from "antd";
import { connect } from 'react-redux';
import './index.less'
import Util from '../../utils/utils'

class InnerHeader extends Component{
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
                        <Button type="default" onClick={this.toggleCollapsed} style={{ marginBottom: 16, border:  'none'}}>
                            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </Button>
                        <span className="wrapper">
                            <span>Welcome，{this.state.userName}</span>
                            <a href="#">Log out</a>
                        </span>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        {this.props.menuName}
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">{this.state.sysTime}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state.switchMenu)
    return {
        menuName: state.switchMenu.menuName
    }
}
export default connect(mapStateToProps)(InnerHeader);