import React, {Component}from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './firstpage';
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import NoMatch from './pages/nomatch';
import Home from './pages/home';
import Finish from './pages/finish';
import Project from './pages/inprocess';
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
                                <Route path="/admin/ui/buttons" component={Buttons}></Route>
                                <Route path="/admin/finish" component={Finish} />
                                <Route path="/admin/project" component={Project} />
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