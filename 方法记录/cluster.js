const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

console.log("numCPUs", numCPUs)
if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
}
else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('你好世界\n');
  }).listen(8000);
  console.log(`工作进程 ${process.pid} 已启动`);
}