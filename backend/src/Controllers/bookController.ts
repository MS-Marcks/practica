import { Body, Get, JsonController, Param, Post, Put } from "routing-controllers";
import bookJson from '../data/books_public.json'
import { Book } from "../types/book.interface";
import { newUID } from "../Utils/util";

@JsonController('/books')
export class BookController {
    books: any[]

    constructor() {
        this.books = [...bookJson]
    }

    /**
     * Buscar libros por propietario
     * @param owner
     */
    @Get('/owner/:owner/:count')
    getByProfile(@Param('owner') owner: string, @Param('count') count: number) {
        if (count == -1) {
            return this.books.filter(book => book.userRegister == owner)
        }
        return this.books.filter(book => book.userRegister == owner).slice(0, count)
    }

    @Get('/public')
    getPublic() {
        return this.books.filter(book => book.publish === true)
    }

    @Get('')
    getAll() {
        return []
        /*return [...bookJson].map(book => ({
            ...book,
            id: newUID(),
        }))*/
    }

    @Post('')
    createBook(@Body() body: any) {
        this.books.push({
            ...body,
            id: newUID()
        });
        return { message: "Se registro un nuevo libro" }
    }

    @Put('')
    updateBook(@Body() body: any) {
        const index = this.books.findIndex((book) => {
            if (book.id === body.id) {
                return true;
            }
        });
        this.books[index] = body;
        return { message: "Se actualizo un libro" }
    }

    @Get('/:id')
    getBook(@Param('id') id: string) {
        return this.books.find(book => book.id == id)
    }

}
