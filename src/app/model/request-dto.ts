export class RequestDTO {
    userId!: number;
    description!: string;
    justification!: string;
    deliveryMode!: string;
    dateNeeded!: Date

    constructor() {
        this.userId = 0;
        this.description = "";
        this.justification = "";
        this.deliveryMode = "";
        this.dateNeeded = new Date()
    }
}
