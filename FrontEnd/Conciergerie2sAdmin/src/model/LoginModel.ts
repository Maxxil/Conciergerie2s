export class LoginModel{
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