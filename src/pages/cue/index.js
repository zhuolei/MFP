import React from 'react';
import {connect} from 'react-redux';
import {Card,Tooltip,Progress, Empty, Row, Col, List, Avatar, Button, message, Table} from 'antd';
import {withRouter} from 'react-router-dom';
import {getproject} from '../../redux/action/project.action'
import {getprojects} from '../../redux/action/projects.action'
import CreatePictureForm from './createpicture';
import CreateCueForm from './createcue';
import {createpicture, getpicture} from './../../redux/action/picture.action';
import moment from 'moment';
import { dispatch } from 'rxjs/internal/observable/range';
class Cue extends React.Component{
    state = {
        createPictureFormVisible: false,
        createCueFormVisible: false,
        picture: {},
        project: null,
    }
    componentDidMount() {
        this.props.getpicture(this.props.projectId);
        if(!this.props.project || !this.props.projects) {
            this.props.getprojects(this.props.teamId)
            this.props.getproject(this.props.projectId);
            this.setState({
                project: this.props.project
            })
            // console.log(this.props.teams); 值为Null
            // this.setState({
            //     teamlist: [...(this.props.teams||[])]
            // })
            // console.log(this.props.getTeams())  
        }
        
    }
    componentWillMount() {
        this.setState({
             picture: this.props.picture||{},  
             project: this.props.projectInitialValues ||{}
            })
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps.project)
    //     console.log(this.props.project)
    //     if(nextProps.location.pathname !==this.props.location.pathname) {
    //         console.log(nextProps.location.pathname)
    //         console.log(this.props.location.pathname)
    //         // this.props.getproject(this.props.match.params.projectId);
    //     }
    // }
    // create cue
    createCueFormHandleCreate = () => {
        const form = this.cueForm.props.form;
        const formValue = this.cueForm.props.form.getFieldsValue();
    }
    createCueFormHandleCancel = () => {
        this.setState({
            createCueFormVisible: false
        })
    }
    showCreateCueForm = () => {
        this.setState({
            createCueFormVisible: true
        })
    }
    // createpicture
    showCreatePictureForm = () => {
        this.setState({
            createPictureFormVisible: true
        })
    }
    createPictureFormHandleCancel = () => {
        this.setState({
            createPictureFormVisible: false
        })
    }
    createPictureFormHandleCreate = () => {
        const form = this.pictureForm.props.form;
        const formValue = this.pictureForm.props.form.getFieldsValue();
        console.log(formValue);
        form.validateFieldsAndScroll((err) => {
            if (err) {
            return;
            }
            form.resetFields();
            this.setState({ createProjectFormVisible: false });
        });
        
        const finalFormValue = Object.assign(formValue);
        finalFormValue.intime = finalFormValue.intime.format('HH:mm:ss')
        finalFormValue.outtime = finalFormValue.outtime.format('HH:mm:ss')
        finalFormValue.thedate = finalFormValue.thedate.format('YYYY-MM-DD')
        finalFormValue.projectId = this.props.match.params.projectId;
        console.log(finalFormValue);
        this.props.createpicture(finalFormValue, (res) => {
            if (res.data.success) {
                message.success('picture is created successly');
                this.setState({
                    createPictureFormVisible: false,
                    picture: res.data.picture || {},
                    project: this.props.projectInitialValues
                })
            } else {
                message.error('Error');
            }
        })
    }
    render() {
        const project = this.props.projectInitialValues;

        const ListContent = ( { startdate, enddate } ) => (
            <div className="headerContent">
              <div className="headerContentItem">
                <span>Start Date</span>
                <p>{startdate}</p>
              </div>
              <div className="headerContentItem">
                <span>End Date</span>
                <p>{enddate}</p>
              </div>
            </div>
        );
        // const intime = this.props.picture.intime || '00:00:00';
        // const outtime = this.props.picture.intime || '00:00:00';
        const columns = [{
                title: "STATUS",
                dataIndex: 'status',
            },{
                title: "SUB STATUS",
                dataIndex: 'substatus',
            },{
                title: "CUE #",
                dataIndex: 'cuenumber',
            },
            {
                title: "CUE V.",
                dataIndex: 'version',
            },
            {
                title: "TITLE",
                dataIndex: 'title',
            },
            {
                title: "IN",
                dataIndex: 'intime',
            },
            {
                title: "OUT",
                dataIndex: 'outtime',
            },
            {
                title: "DUR",
                dataIndex: 'duration',
            },
            {
                title: "PICTURE",
                dataIndex: 'picture',
            },
            {
                title: "NOTES",
                dataIndex: 'notes',
            }
        ]
        return (
            
            <div>
                <p><pre>{JSON.stringify(this.props.project)}</pre></p>
                <p><pre>{JSON.stringify(this.state.picture.id)}</pre></p>
                <Card>
                    {(project !== null ? (
                    <List>
                        <List.Item actions={[
                                (this.state.picture.id == null) ?(<Button size="large" onClick={this.showCreatePictureForm}>Add a picture</Button>) : (<Button disabled size="large" onClick={this.showCreatePictureForm}>Add a picture</Button>),
                                <Button size="large" onClick={this.showCreateCueForm}>Add a cue</Button>]
                                }>
                                <List.Item.Meta
                                avatar={<img className="img"width={200} height='100%' alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                title={<div><span>{project.filmtitle}</span>&nbsp;<span>{project.season}</span>&nbsp;<br/><span>{project.episodetitle}</span>&nbsp;<span>{project.episodenumber}</span><br/></div>}
                                description={<div><span>Code Name: {project.codename}</span>&nbsp;|&nbsp;<span>Project Type: {project.projecttype}</span>&nbsp;&nbsp;<br/><span>Time Code Rate: {project.timecoderate}</span>&nbsp;|&nbsp;<span>Lanes in Time Line: {project.lanesintimeline}</span><br/>
                                <span>Start Date: {project.scoringstartdate}</span>&nbsp;|&nbsp;<span>End Date: {project.scoringdeadline}</span></div>}
                                />
                                {/* <ListContent startdate={project.scoringstartdate} enddate={project.scoringdeadline} /> */}
                            </List.Item>
                        </List>
                    ): (
                        <Empty />
                    ))}
                </Card>  
                <Card style={{marginBottom: 20}}>
                <Row gutter={8} type="flex" justify="space-between">    
                <Col xl={2} lg={2} md={6}><span><strong>{this.state.picture.intime || '00:00:00'}</strong></span></Col>
                <Col xl={20} lg={20} md={12}><Tooltip title="3 done / 3 in progress / 4 to do"> 
                  <Progress percent={60} successPercent={30} />   
                </Tooltip>
                </Col>
                <Col xl={1} lg={1} md={6} ><span><strong>{this.state.picture.outtime || '00:00:00'}</strong></span></Col>
                </Row>
                </Card>
                <Card>
                    <Table 
                        columns={columns}
                        expandedRowRender={record => <p style={{ margin: 0 }}>this is notes</p>}
                    >
                    </Table>
                </Card>
                <CreatePictureForm 
                    wrappedComponentRef={(pictureForm)=>{this.pictureForm = pictureForm;}}
                    visible={this.state.createPictureFormVisible}
                    onCancel={this.createPictureFormHandleCancel}
                    onCreate={this.createPictureFormHandleCreate}
                />

                <CreateCueForm
                    wrappedComponentRef={(cueForm)=>{this.cueForm = cueForm;}}
                    visible={this.state.createCueFormVisible}
                    onCancel={this.createCueFormHandleCancel}
                    onCreate={this.createCueFormHandleCreate}
                />
            </div>
        )
    }
}
const mapStateToProps = (state,componentProps) => {
    console.log(state.projects)
    const projectId = JSON.parse(componentProps.match.params.projectId).projectId;
    const teamId = JSON.parse(componentProps.match.params.projectId).teamId;
    console.log(teamId)
    const project = state.projects ? state.projects.find(p => {
        return p.id === +projectId;
      }) : null;
    return {
        project: state.project,
        picture: state.picture,
        teamId: teamId,
        projectId: projectId,
        projectInitialValues: project
    }
}

export default withRouter(connect(mapStateToProps, {getproject,createpicture,getpicture, getprojects})(Cue));