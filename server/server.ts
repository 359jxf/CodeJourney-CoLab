const express = require('express');
const Websocket = require('ws');
const http = require('http');
const ShareDB = require('sharedb');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const json1 = require('ot-json1');

// 在服务器端注册 json1 类型
ShareDB.types.register(json1.type);

// 初始化 Express 应用
const app = express();

// 创建 HTTP 服务器
const server = http.createServer(app);

// 初始化 WebSocket 服务器
const webSocketServer = new Websocket.Server({ server });

// 创建 ShareDB 实例
const backend = new ShareDB();

// 监听 WebSocket 连接
webSocketServer.on('connection', (webSocket) => {
  const stream = new WebSocketJSONStream(webSocket);
  backend.listen(stream);
});

// 启动服务器
server.listen(8080, () => {
  console.log('服务器已启动，地址为 http://localhost:8080');
});
