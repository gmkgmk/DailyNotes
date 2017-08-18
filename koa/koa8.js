const Koa = require("koa");
const app = new Koa();

const handler = async(ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    }
    ctx.app.emit('error', err, ctx);
  }
}

const main = ctx => {
  response.body = "欢迎"
};

app.on('error', function (err) {
  console.log('logging error ', err.message);
  console.log(err);
});

app.use(handler);
app.use(main);
app.listen(3000, _ => {
  console.log("server is listening port 3000")
});