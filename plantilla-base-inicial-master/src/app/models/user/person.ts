import { RoleI } from "../authorization/usr_roles";

export interface PersonI {
    id?:number;
    name: string;
    surname: string;
    DocumentTypeId: number;
    identification: string;
    GenderId?: number;
    //user: number;
    address?: string;
    phone?: string;
    Gender?:any;
    DocumentType?:any;
    user?:{
        id?:number;
        username?: string;
        email?:string;
        // password?: string;
        //fullName: string;
        Roles?:RoleI[];
        avatar?:string;
      }
    nationality?: string;
    date_of_birth?: string;
    rolesUsers?:any[]
}







