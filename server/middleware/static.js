const path = require('path');
const staticCache = require('koa-static-cache');
const LRU = require('lru-cache');
// 最多1000个，最大缓存时间1分钟
const files = new LRU({ max: 1000, maxAge: 60 * 1000 });
const staticMiddleware = staticCache({
    dir: path.join(__dirname, '../../dist'),
    dynamic: true,
    maxAge: 0,
    gzip: false,
    files: files
});

module.exports = async (ctx, next) => {
    if (ctx.path.indexOf('src_pages_user_Login_index_tsx') > -1) {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        })
    }
    return staticMiddleware(ctx, next)
};