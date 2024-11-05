var express = require('express');
var Websocket = require('ws');
var http = require('http');
var ShareDB = require('sharedb');
var WebSocketJSONStream = require('@teamwork/websocket-json-stream');
var json1 = require('ot-json1');
// 在服务器端注册 json1 类型
ShareDB.types.register(json1.type);
// 初始化 Express 应用
var app = express();
// 创建 HTTP 服务器
var server = http.createServer(app);
// 初始化 WebSocket 服务器
var webSocketServer = new Websocket.Server({ server: server });
// 创建 ShareDB 实例
var backend = new ShareDB();
// 监听 WebSocket 连接
webSocketServer.on('connection', function (webSocket) {
    var stream = new WebSocketJSONStream(webSocket);
    backend.listen(stream);
});
// 启动服务器
server.listen(8080, function () {
    console.log('服务器已启动，地址为 http://localhost:8080');
});
