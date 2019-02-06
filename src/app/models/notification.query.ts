export class NotificationQueryDTO {
    id: string;
    title: string;
    message: string;
    enabled: boolean;
    validity: Date;
    local: number;
    channel: string;
}