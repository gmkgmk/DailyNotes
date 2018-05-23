const http = require('http');
const port = '3000';
const express = require('express');
const app = express();
app.set('port', port);

const qiniu = require("qiniu");
const accessKey = '';
const secretKey = '';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


const qiniu = {
  video: 'http://video.iblack7.com/',
  AK: 'sXYDxC_Cw0qF5dNARszX9xXBCojQb3IDPu9R-vka',
  SK: 'bGl-yJtRDEuheP73_immBr1hkoras72Kly0WCnXh'
}

const cloudinary = {
  cloud_name: 'gougou',
  api_key: '852224485571877',
  api_secret: 'ht91J3cXl2TnkAgLR-ftK-iasPE',
  base: 'http://res.cloudinary.com/gougou',
  image: 'https://api.cloudinary.com/v1_1/gougou/image/upload',
  video: 'https://api.cloudinary.com/v1_1/gougou/video/upload',
  audio: 'https://api.cloudinary.com/v1_1/gougou/raw/upload'
}

var keyToOverwrite = 'qiniu.mp4';
var options = {
  scope: bucket + ":" + keyToOverwrite,
  callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
  callbackBodyType: 'application/json'
}

var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

const server = http.createServer(app);
server.listen(port, function () {
  console.log("hppt server is load port " + port)
});