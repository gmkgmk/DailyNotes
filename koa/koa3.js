const Koa = require("koa");
const app = new Koa();
const fs = require('fs');

const main = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream("./demo.html")
}


app.use(main)
app.listen(3000, _ => {
  console.log("server is listening port 3000")
});