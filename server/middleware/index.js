const errorMiddleware = require('./error');
const cookieMiddleware = require('./cookie');
const uploadMiddleware = require('./upload');
const bodyparserMiddleware = require('./bodyparser');
const staticMiddleware = require('./static');
/**
 * 中间件在未设置 ctx.body (response) 前，不调用next无法进行下一步返回处理
 */
module.exports = app => {
    app.use(errorMiddleware);
    app.use(cookieMiddleware);
    app.use(staticMiddleware);
    app.use(uploadMiddleware);
    app.use(bodyparserMiddleware);
};