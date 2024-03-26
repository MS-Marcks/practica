import { RegisterUser } from '../interfaces/register-user.interface';
import { ExtraRegister } from '../interfaces/extra-register.interface';

export const BODY_USER_EXIST: string = "ksuarez";

export const DATA_USER_EXIST: ExtraRegister = {
  exists: true
}

export const BODY_REGISTER: RegisterUser = {
  name: "David",
  email: "david@gmail.com",
  password: "@Dd1234567",
  category: [1, 2, 3]
}

export const DATA_REGISTER: ExtraRegister = {
  message: "Created user"
}
