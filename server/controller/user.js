const UserService = require('../service/user');
module.exports = class UserController {
    async login(ctx, next) {
        const { body } = ctx.request;
        const result = await new UserService().login(body);
        
        ctx.cookies.set('USER_NAME', encodeURIComponent(body.username), {
            domain: ctx.headers['x-host'] || ctx.hostname,
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        
        return ctx.body = result;
    }
    async register(ctx, next) {
        const { body } = ctx.request;
        const result = await new UserService().register(body);
        
        return ctx.body = result;
    }

    async currentUser(ctx, next) {
        const result = await new UserService().currentUser();
        
        return ctx.body = result;
    }

    async outLogin(ctx, next) {
        ctx.cookies.set('USER_NAME', '', {
            domain: ctx.headers['x-host'] || ctx.hostname,
            path: '/'
        });
        
        return ctx.body = { data: {}, success: true };
    }
};