const Koa = require("koa");
const app = new Koa();

const main = ctx => {
  const n = Number(ctx.cookies.get("view") || 0) + 1;
  ctx.cookies.set("view", n);
  ctx.response.body = n + 'view';
}


app.use(main);
app.listen(3000, _ => {
  console.log("server is listening port 3000")
});