import { IsString, IsEmail } from "class-validator";

export class CreateUserDTO{

    @IsString()
    userName : string;
    @IsEmail()
    email  : string ; 
    @IsString()
    password : string ; 
    
    roles : string[];
}

