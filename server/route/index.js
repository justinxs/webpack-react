const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const router = new Router();
const userRoutes = require('./modules/user');

const routes = [].concat(userRoutes);

routes.forEach(({ method, path, action }) => {
    const actionArr = action.split(':');
    const cAction = actionArr[1] || actionArr[0];
    const cName = actionArr[1] ? actionArr[0] : 'public';
    const Controller = require(`../controller/${cName}`);
    const controllerInstance = new Controller();
    router[method](path, controllerInstance[cAction].bind(controllerInstance));
});

router.get(/(.*)/, async(ctx, next) => {
    let resPath = path.resolve(__dirname, `../../dist/index.html`);
    ctx.type = 'html';
    return ctx.body = fs.createReadStream(resPath);
});

module.exports = router;