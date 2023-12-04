import {required} from "@rxweb/reactive-form-validators";

export class ProductInfo {
    @required()
    id: any;

    @required()
    name: string;

    @required()
    description: string;


    publicationDate: Date;

    @required()
    price: Number;
}
