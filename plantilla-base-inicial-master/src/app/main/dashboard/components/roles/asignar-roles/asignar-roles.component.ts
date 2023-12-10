

import { Component } from '@angular/core';
import { assinRoleUserI } from 'src/app/models/usr_assinRoleUser';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { Router, NavigationExtras } from '@angular/router';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { UserI } from 'src/app/models/authorization/usr_User';
import { UserService } from 'src/app/core/services/usuarios/user.service';


@Component({
  selector: 'app-asignar-roles',
  templateUrl: './asignar-roles.component.html',
  styleUrls: ['./asignar-roles.component.css']
})
export class AsignarRolesComponent {

  public roles: assinRoleUserI[] = [];
  public roles2: RoleI[]=[];
  public users: UserI[]=[];
  public user_op: any[]=[];
  public rol_op: any[] = [];  // Esta variable se utilizará en el p-multiSelect
  public selectedRol: any[] = [];  // Variable para almacenar las ciudades seleccionadas
  public Dialog = false;

  constructor(
    private rolesService: RolesService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) {}

  public form:FormGroup=this.formBuilder.group({

    name: ['', [Validators.required]],
    SelectedRoles: ['', [Validators.required]],
    SelectedUsers: ['', [Validators.required]],

  });

  openDialog() {
    this.Dialog = true;

    this.getRolOptions();
  }


  ngOnInit(): void {
    this.getUserRoles();
  }

  getUserRoles() {
    this.rolesService.getUserRolesData().subscribe(
      (data) => {
        this.roles = data;
        console.log('user-rolget(): ', data);
        console.log(this.roles)
      },
      error => {
        console.error('Error obteniendo datos desde el backend', error);
      }
    );
  }

  getRolOptions(){
    this.rolesService.getRole().subscribe(
      (data: RoleI[]) => {
        this.roles2 = data;
        console.log('funicona')

        // Crea el array de ciudades (nombres de roles) para el p-multiSelect
        this.rol_op = this.roles2.map(role => ({ name: role.name, code: role.id }));
      },
      error => {
        console.error('Error obteniendo roles desde el backend', error);
      }
    );

    this.userService.getUsers().subscribe(
      (data: UserI[]) => {
        this.users = data;
        console.log('funciona');

        // Crea el array de usuarios (nombres de roles) para el p-multiSelect
        this.user_op = this.users.map(user => ({ name: user.username, code: user.id }));
      },
      error => {
        console.error('Error obteniendo usuarios desde el backend', error);
      }
    );

  }

  onSubmit(){

  }
  
}
