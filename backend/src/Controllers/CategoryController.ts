import {Get, JsonController} from "routing-controllers";
import categoryJson from '../data/category.json'

@JsonController('/category')
export class CategoryController {

    @Get('')
    getAll() {
        return [
            ...categoryJson
        ]
    }
}
