const Koa = require('koa');
const app = new Koa();

const main = ctx =>{
  ctx.response.body="你好"
};

app.use(main)

app.listen(3000,function(){
  console.log("server listening port 3000")
});