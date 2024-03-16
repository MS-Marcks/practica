import "reflect-metadata";
import {createExpressServer} from 'routing-controllers';
import {CatalogoControllers} from "./Controllers/CatalogoControllers";
import {UserController} from "./Controllers/UserController";
import {CategoryController} from "./Controllers/CategoryController";
import {BookController} from "./Controllers/bookController";

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    cors: true,
    controllers: [
        CatalogoControllers,
        UserController,
        CategoryController,
        BookController,
    ], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(process.env.PORT || 3001, () => {
    console.log(`Servidor Iniciado`);
    console.log(`Host: http://localhost:${3001}`);
});
