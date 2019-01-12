import React from 'react'
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu } from '../../redux/action/switchMenu.action'
import MenuConfig from './../../config/menuConfig';
import './index.less'
const SubMenu = Menu.SubMenu;
class NavLeft extends React.Component {
    state = {
        currentKey:'',
        collapsed: false,
    }
    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }
    handleClick = ({item, key}) => {
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey:key
        })

    }
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'')
        this.setState({
            currentKey,
            menuTreeNode
        })
    }

    renderMenu =(data)=>{
        return data.map((item)=>{
            if(item.children){
                return (
                   
                    <SubMenu title={item.type ? (
                        <span>
                          <Icon type={item.type} />
                          <span>{item.title}</span>
                        </span>
                      ) : (
                        item.title
                      )} key={item.key}>
                        
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                {/* <Icon type="user" /> */}
                <NavLink to={item.key}>
                    <Icon type={item.type} />
                    {item.title}
                </NavLink>
            </Menu.Item>
        })
    }
    render() {
        return (
            <div
                >
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>PMP</h1>
                </div>
                <Menu
                    onClick = {this.handleClick}
                    selectedKeys={[this.state.currentKey]}
                    mode="inline"
                    theme='dark'
                    inlineCollapsed={this.state.collapsed}
                    
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}
export default connect()(NavLeft)