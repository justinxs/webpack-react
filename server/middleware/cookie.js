
module.exports = async (ctx, next) => {
    const userName = ctx.cookies.get('USER_NAME');
    ctx.USER_NAME = userName;
    
    await next();

    // console.log(ctx.url, ctx.type);
    // 后置响应处理
};