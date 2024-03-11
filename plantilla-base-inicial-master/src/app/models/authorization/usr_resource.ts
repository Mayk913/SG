import { RoleI } from "./usr_roles";

export interface ResourceI {
    id?:number;
    path: string;
    method: string ;
    id_parent: string | number;
    icon: string;
    link: string;
    title: string;
    Roles?:RoleI[]
  }