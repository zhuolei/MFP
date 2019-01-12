const menuList = [
    {
        title:'Profile',
        key:'/home',
        type: 'profile',
    },
    {
        title:'Project',
        key:'/project',
        type: 'project',
        children:[
            {
                title:'Teams',
                key:'/project/allteams'
            },
            {
                title:'Team1',
                key:'/project/team1'
            },
            {
                title:'Team2',
                key:'/project/team2'
            }
        ]
    },
    {
        title:'Account',
        key:'/admin/finish',
        type: 'user',
    },
    
    
];
export default menuList;