var express = require('express')
var app = express()
app.use(express.static('dist'));
const port = 8081;
app.get("*", function (req, res) {
  // var getBaseUrl = "http://localhost:8081"
  console.log(req.url)
  // var data = {
  //   urlList: [getBaseUrl + "/latest.yml", getBaseUrl + "/百丽数据平台.exe"],
  //   code: "100",
  //   msg: "success"
  // };
  // res.send(data)
})

app.listen(port,()=>{
  console.log("ready listen at "+port)
})