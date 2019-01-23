import React from 'react';
import {Card} from 'antd';
export default class NoMatch extends React.Component {

    render() {
        return (
            <div style={{textAlign:'center',fontSize:'24'}}>
            <Card>
                <strong>404 No Found!!!</strong>
            </Card>
            </div>
        );
    }
}