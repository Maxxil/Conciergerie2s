import { RoleEnum } from "../Enums/RoleEnum";
import { StatusEnum } from "../Enums/StatusEnum";

export class UserModel{
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: RoleEnum;
    status: StatusEnum;
    address : string;
    mobilePhone : string;
    homePhone : string;

    constructor(){

    }
}
