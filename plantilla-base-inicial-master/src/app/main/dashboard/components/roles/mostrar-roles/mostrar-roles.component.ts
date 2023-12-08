import { Component } from '@angular/core';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';

import { Router, NavigationExtras } from '@angular/router';
import {Message,MessageService} from 'primeng/api'; 


@Component({
  selector: 'app-mostrar-roles',
  templateUrl: './mostrar-roles.component.html',
  styleUrls: ['./mostrar-roles.component.css']
})
export class MostrarRolesComponent {
  public roles:RoleI[] = []
  public displayedColumns: string[] = ["id", "name"]
  public Dialog = false;

  public form:FormGroup=this.formBuilder.group({

    name: ['', [Validators.required]],

  });

  constructor(
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.mostrarRoles();
  }

  openDialog() {
    this.Dialog = true;
  }

  mostrarRoles() {
    this.rolesService.getRole().subscribe({
      next: (data) => {
        //console.log('rol1: ',data); // Asegúrate de que data contenga los roles
        this.roles = data;
        console.log('roles en el componente: ',this.roles);
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }

  ir_actualizar(id: number) {
    this.router.navigateByUrl(`actualizarRoles/${id}`);
  }
  
  
/*===================================METODO ELIMINAR==============================*/
  eliminar(id: number): void {
    this.rolesService.eliminarRole(id).subscribe(
      () => {
        this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Rol Eliminado'});
        // Recargar el componente sin recargar toda la aplicación
        this.mostrarRoles();
      },
      err => {
        console.error('Error al eliminar el rol', err);
      }
    );
  }
  
  onSubmit(): void {
    const formValue: RoleI = this.form.value;
    console.log(formValue);
    this.rolesService.createRole(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

        this.messageService.add({severity:'success', summary: 'Success', detail: 'Rol Creado con exito'});
        this.mostrarRoles();
        this.Dialog=false;

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }
}
