export interface assinRoleResourceI{
    id?:number;
    RecursosRoles:[
      {
        resource_Id: string; 
        role_Id:string;
      }
    ]
    
  }