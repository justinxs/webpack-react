
module.exports = async (ctx, next) => {
    const userName = ctx.cookies.get('USER_NAME');
    
    await next();

    // console.log(ctx.url, ctx.type);
    // 后置响应处理
};