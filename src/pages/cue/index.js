import React from 'react';
import {connect} from 'react-redux';
import {Card,Tooltip,Progress} from 'antd';
import {withRouter} from 'react-router-dom';
import {getproject} from '../../redux/action/project.action'

class Cue extends React.Component{
    componentDidMount() {
        if(!this.props.project) {
            this.props.getproject(this.props.match.params.projectId);
            // console.log(this.props.teams); 值为Null
            // this.setState({
            //     teamlist: [...(this.props.teams||[])]
            // })
            // console.log(this.props.getTeams())
        }
        
    }
    render() {
        return (
            <div>
            <Card>
            <img width={200} height={100} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />

            </Card>
            
            <p><pre>{JSON.stringify(this.props.project)}</pre></p>
            
            <Card style={{marginBottom: 20}}>
            <Tooltip title="3 done / 3 in progress / 4 to do">
                <Progress percent={60} successPercent={30} />
            </Tooltip>
            </Card>
            <Card>
                Cue
            </Card>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        project: state.project,
    }
}

export default withRouter(connect(mapStateToProps, {getproject})(Cue));