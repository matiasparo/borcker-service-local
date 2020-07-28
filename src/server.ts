import express = require("express");
import bodyParser from "body-parser";
import http from "http";
import * as WebSocket from "ws";
import { ApiRouter } from "./api-router";
import { BrokerNotification } from "./broker-notification.model";

// Create a new express application instance
const app: express.Application = express();

// Express configuration
app.set("port", process.env.PORT || 4001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Creates the api router and configures the endpoints.
const apiRouter = new ApiRouter();
app.use("/", apiRouter.Routes);

// Creates an http server from express app, to attach to a websocket instance.
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const WebSocketWrapper = require("ws-wrapper");

// Once socket connection is created, subscribes to apiRouter notification observable
// to emit notification information.
wss.on("connection", (socket: any) => {
    socket = new WebSocketWrapper(socket);
    apiRouter.onNotificationReceived.subscribe((notification: BrokerNotification) => {
        socket.of(notification.NotificationChannel).emit(notification.NotificationData);
    });
});

server.listen(app.get("port"), () => {
    console.log("  Broker Server is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});

export default server;
