import dotenv from "dotenv";
import http from "http";

import App from "./App";

dotenv.config();

const port = normalizePort(process.env.PORT || 3000);
const server = http.createServer(App);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: number|string): number|boolean {
  const portNumber: number = (typeof val === "string") ? parseInt(val, 10) : val;
  if (!isNaN(portNumber) && portNumber >= 0) {
    return portNumber;
  }
  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") { throw error; }
  const bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      // tslint:disable-next-line: no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      // tslint:disable-next-line: no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
  // tslint:disable-next-line: no-console
  console.log(`Affiliate Tracker server started on ${bind}`);
}
