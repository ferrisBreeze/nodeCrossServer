
// 一个简单的允许跨域node文件服务器
var fs = require('fs'),
	url = require('url'),
	path = require('path'),
	http = require('http');

// 获得根目录
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);

http.createServer(function (request, response) {  
  response.setHeader("Access-Control-Allow-Origin", "*");
  // response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  response.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  // response.setHeader("X-Powered-By",' 3.2.1');
 	// response.setHeader("Content-Type", "application/json;charset=utf-8");

  // 获得URL的path，类似 '/css/bootstrap.css':
  var pathname = url.parse(request.url).pathname;

  // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
  var filepath = path.join(root, pathname);

  fs.stat(filepath, function (err, stats) {
    if (!err && stats.isFile()) {
      // 没有出错并且文件存在:
      console.log('200 ' + request.url);
      // 发送200响应:
      response.writeHead(200);
      // 将文件流导向response:
      fs.createReadStream(filepath).pipe(response);
    } else {
      // 出错了或者文件不存在:
      console.log('404 ' + request.url);
      // 发送404响应:
      response.writeHead(404);
      response.end('404 Not Found');
    }
	});
}).listen(8001);  
console.log('Server running at http://127.0.0.1:8001/');  