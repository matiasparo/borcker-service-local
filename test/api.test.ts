import request from "supertest";
import server from "../src/server";
import { BrokerNotification } from "../src/broker-notification.model";
import { ChannelEnum } from "../src/channel-enum.model";

describe("Check Endpoint Status", () => {
    it("should return 200 OK", () => {
        return request(server)
            .get("/")
            .expect(200);
    });
});

describe("Fail Notification", () => {
    it("Should return 400 BadRequest", () => {
        // Sends invalid notification to the broker.
        return request(server)
            .post("/notifications")
            .send(undefined)
            .expect(400);
    });
});

describe("Departure Success Notification", () => {
    it("Should return 200 OK", () => {
        // Defines the parameters for a vetcheck channel notification.
        const reqParams: BrokerNotification = {
            NotificationChannel: ChannelEnum.DepartureChannel,
            NotificationData: "255"
        };

        // Sends the notification to the broker.
        return request(server)
            .post("/notifications")
            .send(reqParams)
            .expect(200);
    });
});

describe("Arrival Notification", () => {
    it("Should return 200 OK", () => {
        // Defines the parameters for a vetcheck channel notification.
        const reqParams: BrokerNotification = {
            NotificationChannel: ChannelEnum.ArrivalChannel,
            NotificationData: "255"
        };

        // Sends the notification to the broker.
        return request(server)
            .post("/notifications")
            .send(reqParams)
            .expect(200);
    });
});

describe("VetCheck Notification", () => {
    it("Should return 200 OK", () => {
        // Defines the parameters for a vetcheck channel notification.
        const reqParams: BrokerNotification = {
            NotificationChannel: ChannelEnum.VetCheckChannel,
            NotificationData: "255"
        };

        // Sends the notification to the broker.
        return request(server)
            .post("/notifications")
            .send(reqParams)
            .expect(200);
    });
});

describe("VetCheckScreencast Notification", () => {
    it("Should return 200 OK", () => {
        // Defines the parameters for a vetcheck channel notification.
        const reqParams: BrokerNotification = {
            NotificationChannel: ChannelEnum.VetCheckScreenCastChannel,
            NotificationData: "255"
        };

        // Sends the notification to the broker.
        return request(server)
            .post("/notifications")
            .send(reqParams)
            .expect(200);
    });
});

describe("Sync Notification", () => {
    it("Should return 200 OK", () => {
        // Defines the parameters for a vetcheck channel notification.
        const reqParams: BrokerNotification = {
            NotificationChannel: ChannelEnum.SyncChannel,
            NotificationData: "255"
        };

        // Sends the notification to the broker.
        return request(server)
            .post("/notifications")
            .send(reqParams)
            .expect(200);
    });
});
