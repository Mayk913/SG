

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

    rolesId: ['', [Validators.required]],
    userId: ['', [Validators.required]],

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
        // console.log('user-rolget(): ', data);
        console.log('getUserRoles: ',this.roles)
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
        // console.log('funicona')

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

  onSubmit() {
    if (this.form.valid) {
      const selectedUsers = this.form.get('userId')?.value;
      const selectedRoles = this.form.get('rolesId')?.value;
      
      // Extraer la primera ID seleccionada
      const userId = selectedUsers.length > 0 ? selectedUsers[0].code : null;
      const rolesId = selectedRoles.length > 0 ? selectedRoles[0].code : null;
  
      // Verifica que haya usuarios y roles seleccionados
      if (userId && rolesId) {
        console.log('User ID:', userId);
        console.log('Role ID:', rolesId);
  
        const rolesAssignment = {
          userId: userId,
          rolesId: rolesId,
        };
  
        // Llama al servicio con los datos correctos
        this.rolesService.assinRole(rolesAssignment).subscribe(
          (data) => {
            // Maneja la respuesta según lo que necesites
            console.log('Asignación exitosa:', data);
            this.getUserRoles();
            this.Dialog=false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Asignación exitosa',
            });
          },
          (error) => {
            console.error('Error al asignar roles:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Error al asignar roles. ${error.error.dataErros[0].message}`,
            });
          }
        );
      } else {
        console.error('Debe seleccionar al menos un usuario y un rol.');
        this.messageService.add({
          severity: 'warn',
          summary: 'Warn',
          detail: 'Debe seleccionar al menos un usuario y un rol.',
        });
      }
    } else {
      console.error('Formulario no válido. Verifica los campos.');
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Formulario no válido. Verifica los campos.',
      });
    }
  }
  
  eliminar(id: number): void {
    this.rolesService.eliminarUserRol(id).subscribe(
      () => {
        this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Rol Eliminado'});
        // Recargar el componente sin recargar toda la aplicación
        this.getUserRoles();
      },
      err => {
        console.error('Error al eliminar el rol', err);
      }
    );
  }
  
  
}
