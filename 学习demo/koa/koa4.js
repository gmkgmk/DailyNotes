const Koa = require("koa");
const app = new Koa();
const fs = require('fs');

const main = ctx => {
  if (ctx.request.path !== "/") {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream("./demo.html");
  }else{
    ctx.response.type = 'text'
    ctx.response.body=`<h1>你访问的是${ctx.response.type}</h1>`
  }
}


app.use(main)
app.listen(3000, _ => {
  console.log("server is listening port 3000")
});