import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document ; 


@Schema()
export class User{
    @Prop()
    userName : string ; 

    @Prop()
    email : string ; 

    @Prop()
    password : string ;

    /* @Prop()
    roles : Role[] ; */ 
}

export const UserSchema = SchemaFactory.createForClass(User)