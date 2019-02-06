export class NotificationFilterDTO {

    constructor(public locals: number[], public channels: number[], public enabled: boolean, 
                public page: number, public max: number, public order: string, public field: string) {
    }
}