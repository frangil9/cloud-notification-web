export class NotificationDTO {
    title: string;
    message: string;
    enabled: boolean;
    read: boolean;
    user: string;
    validity: string;
    channelIds: number[];
    localIds: number[];
}