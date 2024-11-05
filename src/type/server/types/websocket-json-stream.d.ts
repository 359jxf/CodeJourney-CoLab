declare module '@teamwork/websocket-json-stream' {
    import WebSocket from 'ws';
    export default class WebSocketJSONStream {
      constructor(ws: WebSocket);
    }
  }
  