// onChange={this.setTeamId(item.id)}
// <List
//                     rowKey="id"
//                     // loading={loading}
//                     // style={{ marginTop: 24 }}
//                     xs={24} sm={12} md={12} lg={8} xl={8}
//                     grid={{ gutter: 24, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
//                     // dataSource={}
//                     // renderItem={item =>
//                     // item ? (
//                     //     <List.Item key={item.id}>
//                     //     <Card 
//                     //         hoverable 
//                     //         bodyStyle={{ paddingBottom: 20 }}
//                     //         actions={[
//                     //         <Tooltip title="Invite" onChange={this.setTeamId(item.id)} onClick={this.showInviteModal}>
//                     //             <Icon type="team" />
//                     //         </Tooltip>,
//                     //         <Tooltip title="Edit">
//                     //             <Icon type="edit" />
//                     //         </Tooltip>,
//                     //         <NavLink to={`/admin/project/detail/${item.id}`}>
//                     //         <Tooltip title="Project">
//                     //             <Icon type="project" />
//                     //         </Tooltip>
//                     //         </NavLink>,
//                     //         ]}
                            
//                     //         >
//                     //         <Card.Meta 
//                     //         avatar={<Avatar size="small" src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />} 
                            
//                     //         title={item.teamname} />
//                     //             <div className='cardItemContent'>
//                     //             <CardInfo
//                     //                 membersNumber={item.membersNumber}
//                     //                 ProjectsNumber={numeral(item.id).format('0,0')}
//                     //             />
//                     //             </div>
//                     //     </Card>
//                     //     <div><pre>{JSON.stringify(item)}</pre></div>
//                     //     <InviteMemberForm
//                     //         wrappedComponentRef={(inviteTeamForm)=>{this.inviteTeamForm = inviteTeamForm;}}
//                     //         visible={this.state.inviteMemberFormVisible}
//                     //         onCancel={this.inviteHandleCancel}
//                     //         onInvite={this.inviteHandleCreate}
//                     //     />
//                     //     </List.Item>
//                     // ) : (
//                     //     <List.Item>
//                     //     <Button 
//                     //         type="dashed" 
//                     //         className='newButton'
//                     //         onClick={this.showModal}
//                     //         >
//                     //         <Icon type="plus" /> Add a New Team
//                     //     </Button>
//                     //     </List.Item>
//                     // )
//                     // }
//                 />

// const teamList = this.state.teamlist.map((item, index) => (
        //     item ? (
        //     <Col  xs={24} sm={12} md={12} lg={8} xl={8}>
        //     <Card 
        //         key={item.id}
        //         hoverable 
        //         bodyStyle={{ paddingBottom: 20 }}
        //         style={{marginBottom: 20}}
        //         actions={[
        //         <Tooltip title="Invite" onChange={this.setTeamId(item.id)} onClick={this.showInviteModal.bind(this, index)}>
        //             <Icon type="team" />
        //         </Tooltip>,
        //         <Tooltip title="Edit">
        //             <Icon type="edit" />
        //         </Tooltip>,
        //         <NavLink to={`/admin/project/detail/${item.id}`}>
        //         <Tooltip title="Project">
        //             <Icon type="project" />
        //         </Tooltip>
        //         </NavLink>,
        //         ]}
                
        //         >
        //         <Card.Meta 
        //         avatar={<Avatar size="small" src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />} 
        //         title={item.teamname} />
        //             <div className='cardItemContent'>
        //             <CardInfo
        //                 membersNumber={item.membersNumber}
        //                 ProjectsNumber={numeral(item.id).format('0,0')}
        //             />
        //             </div>
        //     </Card>
        //     <div><pre>{JSON.stringify(item)}</pre></div>
            
        //     </Col>
        //     ): (
        //         <Col  xs={24} sm={12} md={12} lg={8} xl={8}>
        //         <Button 
        //             type="dashed" 
        //             className='newButton'
        //             onClick={this.showModal}
        //             >
        //             <Icon type="plus" /> Add a New Team
        //         </Button>
        //         </Col>
        //     )
        // ));
        

        // const TeamList = ()