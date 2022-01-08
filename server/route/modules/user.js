module.exports = [
    {
        path: '/api/login',
        method: 'post',
        action: 'user:login'
    },
    {
        path: '/api/register',
        method: 'post',
        action: 'user:register'
    },
    {
        path: '/api/outLogin',
        method: 'post',
        action: 'user:outLogin'
    },
    {
        path: '/api/currentUser',
        method: 'get',
        action: 'user:currentUser'
    },
];