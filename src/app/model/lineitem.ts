import { Product } from "./product";
import { Request } from "./request";

export class Lineitem {
    id: number;
    product: Product;
    request: Request;
    quantity: number;

    constructor(id: number=0, product: Product=new Product(),request: Request = new Request(), quantity: number=0, total: number=0) {
        this.id = id;
        this.request = request;
        this.product = product;
        this.quantity = quantity;
    }
}
