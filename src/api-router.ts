import { BrokerNotification } from "./broker-notification.model";
import { Response, Request, Router } from "express";
import { Subject } from "rxjs";

export class ApiRouter {
    // private eventEmitter = new EventEmitter();
    private routes: Router;

    public onNotificationReceived: Subject<BrokerNotification>;

    get Routes(): Router {
        return this.routes;
    }

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        this.onNotificationReceived = new Subject();
        this.routes = Router();

        // Sets the root path.
        this.routes.get("/", (req: Request, res: Response) => {
            res.send("Notification API is running!");
        });

        // Sets the notification endpoint.
        this.routes.post("/notifications", (req: Request, res: Response) => {
            let notification: BrokerNotification;

            // Checks if the request is valid and try to cast it to a BrokerNotification instance.
            if (req && req.body) {
                notification = req.body as BrokerNotification;
            }

            console.log(notification);
            if (notification && Object.keys(notification).length > 0) {
                // As the request is valid, we emit the notification through the eventEmitter and returns a 200 with "ok";
                this.onNotificationReceived.next(notification);
                res.sendStatus(200);
            } else {
                // In this case, the request is not in the expected format, so we return a 400 (bad request).
                res.sendStatus(400);
            }
        });
    }
}
