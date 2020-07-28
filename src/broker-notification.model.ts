import { ChannelEnum } from "./channel-enum.model";

export interface BrokerNotification {
    NotificationChannel: ChannelEnum;
    NotificationData: any;
}
