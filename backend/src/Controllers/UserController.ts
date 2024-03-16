import {
    Body,
    BodyParam,
    ContentType,
    Get,
    JsonController,
    Param,
    Post,
    QueryParam,
    UnauthorizedError
} from "routing-controllers";
import userJson from '../data/users.json'
import { User } from "../types/user.interface";
import { generateJwt, hashPassword, isPasswordCorrect, newUID } from "../Utils/util";

@JsonController('/users/')
export class UserController {

    users: User[]

    constructor() {
        this.users = [...userJson]
    }

    @Get('')
    getAll() {
        return [...this.users]
    }

    @Get('password')
    getPassword(@QueryParam('passw') password: string) {
        return hashPassword(password)
    }

    @Post('login')
    @ContentType('application/json')
    login(@BodyParam("username") username: string,
        @BodyParam("password") password: string) {

        //Get user from database
        let user: User;

        user = this.findEmail(username);
        if (user === null || user === undefined)
            throw new UnauthorizedError("NOMBRE DE USUARIO INCORRECTO")

        //Check if encrypted password match
        if (!isPasswordCorrect(password, user.password)) {
            throw new UnauthorizedError("CLAVE INCORRECTA")
        }

        //Sing JWT, valid for 1 hour
        const token = generateJwt(user);

        return {
            user: {
                userId: user.id,
                username: user.name,
            },
            access_token: token,
            tokenType: 'Bearer '
        };

    }

    @Post('')
    createUser(@Body() body: any) {
        this.users.push({
            ...body,
            id: newUID(),
            password: hashPassword(body.password),
        });
        return { message: "Created user" }
    }

    @Get('exist-name/:name')
    existName(@Param('name') userName: string) {
        return { exists: this.existItem(userName, 'name') };
    }

    @Get('exist-email/:email')
    existEmail(@QueryParam('email') email: string) {
        return { exists: this.existItem(email, 'email') };
    }

    findName = (name: string) => {
        return this.users.find((user: User) => user.name === name)
    }

    findEmail = (email: string) => {
        return this.users.find((user: User) => user.email === email)
    }

    existItem = (valueSearch: string, option: 'email' | 'name') => {
        return this.users.some((user: User) => user[option] === valueSearch)
    }

}

