const Koa = require("koa");
const app = new Koa();
const koaBody = require('koa-body');

const main = async function (ctx) {
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  ctx.body = {
    name: body.name,
    psd: body.pas,
    all:body
  };
};

app.use(koaBody());

app.use(main);
app.listen(3000, _ => {
  console.log("server is listening port 3000")
});