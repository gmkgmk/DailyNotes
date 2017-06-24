const http = require("http");
const url = require("url");
const route = require("./router");
const requestHandlers = require("./requestHandler");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

let Start = (req, res) => {
  var postData = "";
  var pathname = url.parse(req.url).pathname;
  console.log("Request for " + pathname + " received.");

  req.setEncoding("utf8");

  req.addListener("data", postDataChunk => {
    postData += postDataChunk;
    console.log("Received POST data chunk '" +
      postDataChunk + "'.")
  })
  req.addListener("end", () => {
    route.route(handle, pathname, res,postData);
  })
  console.log("服务调用了函数")

}
http.createServer(Start).listen(8000)
console.log("开启了服务")