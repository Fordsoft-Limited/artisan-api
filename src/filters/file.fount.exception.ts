import { NotFoundException } from "@nestjs/common";


export class FileNotFoundException extends NotFoundException {

    constructor(public validationErrors:string) {
        super(validationErrors);
    }

}