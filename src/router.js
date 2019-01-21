import React, {Component}from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './firstpage';
import Admin from './admin';
import NoMatch from './pages/nomatch';
import Home from './pages/home';
import AllProjects from './pages/project/projectlist';
import Team from './pages/team';
import Basic from './pages/account/BaseView';
export default class IRouter extends Component{

    render(){
        return(
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/project/allteams" component={Team}/>
                                {/* <Route path="/admin/project/team1" component={AllProjects} /> */}
                                {/* <Route path="/admin/team2" component={Project} /> */}
                                <Route path="/admin/project/detail/:teamId" component={AllProjects} />
                                <Route path="/admin/account/basic" component={Basic} />
                                <Route component={NoMatch}></Route>
                            </Switch>
                        </Admin>
                    }></Route>
                    <Route path="/project/detail" component={Login}></Route>
                </App>
            </HashRouter>
        )
    }
}