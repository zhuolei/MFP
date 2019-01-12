import React, {Component}from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './firstpage';
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import NoMatch from './pages/nomatch';
import Home from './pages/home';
import Finish from './pages/finish';
import AllProjects from './pages/project';
import Team from './pages/team';
export default class IRouter extends Component{

    render(){
        return(
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/finish" component={Finish} />
                                <Route path="/project/allteams" component={Team}/>
                                <Route path="/project/team1" component={AllProjects} />
                                {/* <Route path="/admin/team2" component={Project} /> */}
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