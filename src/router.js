import React from 'react';
import { HashRouter, Router, Switch} from 'react-router-dom';
import App from './App';

export default class IRouter extends Component{

    render(){
        return(
            <HashRouter>
                <App>
                    
                </App>
            </HashRouter>
        )
    }
}