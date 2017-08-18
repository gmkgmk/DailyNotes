const Koa = require("koa");
const app = new Koa();
const fs = require('fs');
const route = require('koa-route');

const about = ctx => {
  ctx.response.type = "html";
  ctx.response.body = fs.createReadStream("./demo.html");
}

const index = ctx => {
  ctx.response.type = 'text';
  ctx.response.body = 'hello world';
}

app.use(route.get('/', index))
app.use(route.get('/about', about))

app.listen(3000, _ => {
  console.log("server is listening port 3000")
});