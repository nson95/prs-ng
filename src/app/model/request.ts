import { User } from "./user";

export class Request {
    id: number;
    user!: User;
    requestNumber: string;
    description: string;
    justification: string;
    deliveryMode: string;
    dateNeeded: Date;
    status: string;
    total: number;
    submittedDate: Date;
    reasonForRejection: string;

    constructor() {
        this.id = 0;
        this.user = new User();
        this.requestNumber = '';
        this.description = '';
        this.justification = '';
        this.dateNeeded = new Date();
        this.deliveryMode = '';
        this.status = '';
        this.total = 0;
        this.submittedDate = new Date();
        this.reasonForRejection = '';
    }

}
