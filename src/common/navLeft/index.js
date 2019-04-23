import React from 'react'
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu } from '../../redux/action/switchMenu.action'
import { getTeams } from '../../redux/action/teamAuth.action';
import MenuConfig from './../../config/menuConfig';
import './index.less'
const SubMenu = Menu.SubMenu;
class NavLeft extends React.Component {
    
    state = {
        currentKey:'',
        collapsed: false,
        teamlist:[],
    }
    componentDidMount() {
        // this.props.getTeams();  
        // const teams = this.props.getTeams(); 
        // console.log(this.state.teamlist)
    }
    componentWillReceiveProps(nextProps) {
        console.log("****")  
        console.log(this.props.teams);
        console.log("****")  
        if (nextProps.teams !== this.props.teams) {
            const teams = nextProps.teams;
            console.log("****")
            console.log(teams.data)
            console.log("****")      
            // this.setState({
            //     teamlist: list
            // })
        }  else {
            const list=[this.props.teams];
            console.log(list)
        }
    }
    componentWillUpdate(nextProps, nextState){
        // state.teamlist
        // this.setState({
        //     teamlist: this.props.teams
        // })
        console.log(nextProps)
    }
    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }
    handleClick = ({item, key}) => {
        // console.log(MenuConfig);
        // console.log(this.props);
        this.props.switchMenu(item.props.title);
        this.setState({
            currentKey:key
        })

    }
    componentWillMount(){
        console.log(this.props.teams)
        this.setState({
            teamlist: [...(this.props.teams||[])]
        })
        //动态menu实现不了
        const childrenItem = {
            title: '',
            key: ''
        }
        const children = []
        const newMenuConfig = []
        // MenuConfig[1].children.push(childrenItem)
        // console.log(MenuConfig[1].children);
        // MenuConfig[1].children.push;
        this.state.teamlist.map((item) => {
            let i = item.team.teamname;
            childrenItem.title = {i}
            childrenItem.key = `/admin/project/${i}`
            // newMenuConfig = MenuConfig[1].children.push(childrenItem)
            console.log(MenuConfig[1].children.push(childrenItem))
        })
        // teams.data.map(item => {
        //     console.log(item)
        // })
        // console.log(MenuConfig[1].children)
        //
        const newMenu = {
            title:'Users',
            key:'/admin/users',
            type: 'edit',
        }
        const userRole = this.props.loggedIn || {};
        if(userRole.authorities.length > 1 && MenuConfig.length < 4) {
            MenuConfig.push(newMenu);
    
        } else if (userRole.authorities.length == 1 && MenuConfig.length == 4){
            MenuConfig.pop();
        } 
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

const mapStateToProps = state => {
    // console.log(state.switchMenu)
    return {
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps,{getTeams, switchMenu})(NavLeft)