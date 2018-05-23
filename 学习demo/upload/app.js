/*
 * @Author: guo.mk 
 * @Date: 2018-01-10 15:46:43 
 * @Last Modified by: guo.mk
 * @Last Modified time: 2018-01-10 15:58:47
 */
const koa = require("koa");
const app = new koa();

const logger = require("koa-logger");
const koaStatic = require("koa-static");
const multer = require("koa-multer");
const route = require("koa-router");

const PORT = 3000;
const Router = new route({
  prefix: "/api"
});
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (ctx, file, cb) => {
    var splits = file.originalname.split(".");
    var suffix = splits[splits.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + suffix);
  }
});
var upload = multer({ storage: storage });


app.use(logger());
app.use(koaStatic(__dirname + "/src"));

const service = {
  async upload(ctx, next) {
    console.log(ctx)
    ctx.body = {
      code: 0,
      message: "上传成功"
    };
  }
};

Router.post("/profile", upload.single("avatar"), service.upload);
app.use(Router.routes()).use(Router.allowedMethods());

app.listen(PORT);
console.log(`app is listening ${PORT}`);
