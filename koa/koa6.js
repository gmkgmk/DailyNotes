const Koa = require("koa");
const app = new Koa();
const route = require('koa-route');
const fs = require('fs.promised');

const main = async function (ctx, next) {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile('./demo.html', 'utf8');
}

app.use(main);
app.listen(3000, _ => {
  console.log("server is listening port 3000")
});