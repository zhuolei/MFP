const menuList = [
    {
        title:'Profile',
        key:'/admin/home',
        type: 'profile',
    },
    {
        title:'Project',
        key:'/admin/project',
        type: 'project',
        children:[
            {
                title:'Teams',
                key:'/admin/project/allteams'
            },
            {
                title:'Team1',
                key:'/admin/project/team1'
            },
            {
                title:'Team2',
                key:'/admin/project/team2'
            }
        ]
    },
    {
        title:'Account',
        key:'/admin/account',
        type: 'user',
        children:[
            {
                title:'Basic Setting',
                key:'/admin/account/basic',
            },
            {
                title:'Security Setting',
                key:'/admin/account/security',
            }
        ]
    },
    
    
];
export default menuList;