import React from 'react';
import {connect} from 'react-redux';
import {Card,Tooltip,Progress, Empty, Row, Col, List, Button, message, Table, Spin} from 'antd';

import {withRouter} from 'react-router-dom';
import {getproject} from '../../redux/action/project.action'
import {getprojects} from '../../redux/action/projects.action'
import CreatePictureForm from './createpicture';
import CreateCueForm from './createcue';
import {createpicture, getpicture} from './../../redux/action/picture.action';
import {createcue,getcue} from './../../redux/action/cue.action';

class Cue extends React.Component{
    state = {
        createPictureFormVisible: false,
        createCueFormVisible: false,
        picture: {},
        project: {},
        projectId : '',
        cuelist: [],
        hasData: false
    }
    componentDidMount() {
        this.props.getpicture(JSON.parse(this.props.match.params.projectId).projectId);
        this.props.getcue(this.props.projectId)
        console.log(this.state.projectId)
        if(!this.props.project || !this.props.projects) {
            this.props.getprojects(this.props.teamId)
            this.props.getproject(this.props.projectId);
            this.setState({
                project: this.props.project,
                projectId: JSON.parse(this.props.match.params.projectId).projectId || '',
            })
            // console.log(this.props.teams); 值为Null
            // this.setState({
            //     teamlist: [...(this.props.teams||[])]
            // })
            // console.log(this.props.getTeams())  
        }
        if(!this.state.picture) {
            this.setState({
                picture: this.props.project.picture || {}
            })
        }
        
    }
    componentWillMount() {
        const value = this.props.projectInitialValues || {}
        const list = value.cueList||[]
        const listCopy = [];
        list.map(i => {
                listCopy.push(i);
        })
        this.setState({
             picture: this.props.project || {},  
             project: this.props.projectInitialValues ||{},
             cuelist: [...(listCopy ||[])]
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
        console.log(formValue)
        const finalFormValue = Object.assign(formValue);
        finalFormValue.intime = finalFormValue.intime.format('HH:mm:ss')
        finalFormValue.outtime = finalFormValue.outtime.format('HH:mm:ss')
        finalFormValue.projectId = JSON.parse(this.props.match.params.projectId).projectId;
        console.log(finalFormValue);
        this.props.createcue(finalFormValue, (res) => {
            if (res.data.success) {
                message.success('cue is created successly');
                this.setState({
                    createCueFormVisible: false,
                    cuelist: [...this.state.cuelist, res.data.cue],
                })
            } else {
                message.error('Error');
            }
        })
        
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
        finalFormValue.projectId = JSON.parse(this.props.match.params.projectId).projectId;
        console.log(finalFormValue);
        this.props.createpicture(finalFormValue, (res) => {
            if (res.data.success) {
                message.success('picture is created successly');
                this.setState({
                    createPictureFormVisible: false,
                    picture: res.data.picture || {},
                    project: this.props.projectInitialValues
                })
                this.forceUpdate();
            } else {
                message.error('Error');
            }
        })
    }
    render() {
        const project = this.props.projectInitialValues || {};

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
        const columns = [
            {
                title: "TITLE",
                key:'title',
                dataIndex: 'title',
                width: 100,
            },
            {
                title: "STATUS",
                key:'status',
                width: 200,
                dataIndex: 'status',
            },{
                title: "SUB STATUS",
                key:'substatus',
                width: 200,
                dataIndex: 'substatus',
            },{
                title: "CUE #",
                key:'cuenumber',
                width: 150,
                dataIndex: 'cuenumber',
            },
            {
                title: "CUE V.",
                width: 150,
                key:'version',
                dataIndex: 'version',
            },
            {
                title: "IN",
                width: 200,
                key:'intime',
                dataIndex: 'intime',
            },
            {
                title: "OUT",
                width: 200,
                key:'outtime',
                dataIndex: 'outtime',
            },
            {
                title: "DUR",
                key:'duration',
                width: 150,
                dataIndex: 'duration',
            },
            {
                title: "PICTURE",
                key:'picture',
                width: 150,
                dataIndex: 'picture',
            },
            {
                title: "NOTES",
                key:'notes',
                width: 300,
                dataIndex: 'notes',
            },
            {
                title: 'MODIFY',
                key: 'modify',
                width: 150,
                render:(text,item)=>{
                    return <span><a onClick={(item) => { this.handleEdit(item.id) }}>Edit</a>&nbsp;|&nbsp;<a onClick={(item) => { this.handleDelete(item) }}>delete</a></span>
                }
            }
        ]
        const picture = this.props.project||{}
        const picture2 = this.props.picture || {}
        const pictureCopy = picture.picture || {}
        const list = [...(this.props.cues||[])]
        let percent = 0;
        let number = 0;
        const listCopy = [];
        list.map(i => {
            number += i.duration; 
        })
        percent = Math.floor(number * 100/ picture2.duration)
        return (
            
            <div>
                {/* <p><pre>{JSON.stringify(this.state.cuelist)}</pre></p>
                <p><pre>{JSON.stringify(this.props.cues)}</pre></p>
                <p><pre>{JSON.stringify(list)}</pre></p> */}
                <Card>
                    {(project !== null ? (
                    <List>
                        <List.Item actions={[
                                (picture2.id == null) ?(<Button size="large" onClick={this.showCreatePictureForm}>Add a picture</Button>) : (<Button disabled size="large" onClick={this.showCreatePictureForm}>Add a picture</Button>),
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
                <Col xl={2} lg={2} md={6}><span><strong>{picture2.intime || '00:00:00'}</strong></span></Col>
                <Col xl={20} lg={20} md={12}><Tooltip title=""> 
                  <Progress percent={percent} successPercent={0} />   
                </Tooltip>
                </Col>
                <Col xl={1} lg={1} md={6} ><span><strong>{picture2.outtime || '00:00:00'}</strong></span></Col>
                </Row>
                </Card>
                <Card>
                    
                    {this.props.cues !== null ? (
                        <Table 
                        columns={columns}
                        dataSource={this.props.cues}
                        scroll={{ y: 800 }}
                        style={{textAlign:'center'}}
                        // locale = {{
                        //     emptyText: 'no data'
                        // }}
                        // bordered
                        // expandedRowRender={record => <p style={{ margin: 0 }}>this is notes</p>}
                    >
                    </Table>
                    ):(
                        <Spin />
                    )}
                    
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
    const statecopy = state || {};
    const projects = [...(statecopy.projects||[])]
    const project = projects ? projects.find(p => {
        return p.id === +projectId;
      }) : null;
    return {
        project: state.project,
        picture: state.picture,
        teamId: teamId,
        projectId: projectId,
        projectInitialValues: project,
        cues: state.cues
    }
}

export default withRouter(connect(mapStateToProps, {getproject,createpicture,getpicture, getprojects, createcue, getcue})(Cue));