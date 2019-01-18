import React,{ Component } from 'react';
import { Row, Col, Button, Icon } from "antd";
import { connect } from 'react-redux';
import './index.less'
import Util from '../../utils/utils'
import {logout} from '../../redux/action/auth.action'
import { collapseMenu } from '../../redux/action/switchMenu.action'
import {bindActionCreators} from 'redux';
class InnerHeader extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
      }
  
    //   static getDerivedStateFromProps(props, state) {
    //     if (props.loggedIn) {
    //       return state;
    //     } else {
    //       props.history.push('/login'); // redirect user to login page.
    //       return state;
    //     }
    //   }
    componentWillMount(){
        // this.setState({
        //     userName:'LeoDong'
        // })
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
    }
    toggleCollapsed = () => {
        // const { dispatch } = this.props;
        if(this.state.collapsed){
            this.setState({
                navCol: 0,
                mainCol: 24,
                collapsed: false,
            })
            this.props.collapseMenu(this.state.navCol, this.state.mainCol)
        } else {
            this.setState({
                navCol: 5,
                mainCol: 19,
                collapsed: true,
            })
            this.props.collapseMenu(this.state.navCol, this.state.mainCol)
        }
    }
    handleLogout = () => {
        this.props.logout((res) => {
            if (res.data && res.data.success) {
            //   this.props.history.push('/login');
            window.location.href = '/#/login'
            }
          });
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
                            <span>Welcome，{this.props.loggedIn.username}</span>
                            <a onClick={this.handleLogout}>Log out</a>
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
    // console.log(state.switchMenu)
    return {
        menuName: state.switchMenu.menuName,
        loggedIn: state.loggedIn
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         userlogout: logout
//     }, dispatch)
// }
export default connect(mapStateToProps,{logout, collapseMenu})(InnerHeader);