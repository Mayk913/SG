import { Component } from '@angular/core';

import { RoleI } from 'src/app/models/authorization/usr_roles';
import { assinRoleResourceI } from 'src/app/models/authorization/usr_assinRoleResource';
import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ResourceI } from 'src/app/models/authorization/usr_resource';
import { Router, NavigationExtras } from '@angular/router';
import {Message,MessageService} from 'primeng/api'; 
import { RolesService } from 'src/app/core/services/usuarios/roles.service';


@Component({
  selector: 'app-asignar-recursos',
  templateUrl: './asignar-recursos.component.html',
  styleUrls: ['./asignar-recursos.component.css']
})
export class AsignarRecursosComponent {
  public rolresource: assinRoleResourceI[]=[];
  public recursos: ResourceI[]=[];
  public roles2: RoleI[]=[];
  public rol_op: any[] = [];
  public resource_op: any[] = [];
  public Dialog = false;

  constructor(
    private rolesService: RolesService,
    private resourcesService: ResourcesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) {}

  public form:FormGroup=this.formBuilder.group({

    role_Id: ['', [Validators.required]],
    resource_Id: ['', [Validators.required]],

  });

  openDialog() {
    this.Dialog = true;
    this.getResourceRolOptions();
  }

  ngOnInit(): void {
    this.getResouceRoles();
  }

  onSubmit() {
    if (this.form.valid) {
      const selectedRoles = this.form.get('role_Id')?.value;
      const selectedResources = this.form.get('resource_Id')?.value;
  
      // Extraer la primera ID seleccionada
      const role_Id = selectedRoles.length > 0 ? selectedRoles[0].code : null;
      const resource_Id = selectedResources.length > 0 ? selectedResources[0].code : null;
  
      // Verifica que haya roles y recursos seleccionados
      if (role_Id && resource_Id) {
        console.log('Role ID:', role_Id);
        console.log('Resource ID:', resource_Id);
  
        const resourceRoleAssignment = {
          resource_id: resource_Id,
          role_id: role_Id,
        };
        
  
        // Llama al servicio con los datos correctos
        this.resourcesService.createRoleResource(resourceRoleAssignment).subscribe(
          (data) => {
            // Maneja la respuesta según lo que necesites
            console.log('Asignación exitosa:', data);
            this.getResouceRoles();
            this.Dialog = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Asignación exitosa',
            });
          },
          (error) => {
            console.error('Error al asignar recursos a roles:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Error al asignar recursos a roles. ${error.error.dataErros[0].message}`,
            });
          }
        );
      } else {
        console.error('Debe seleccionar al menos un rol y un recurso.');
        this.messageService.add({
          severity: 'warn',
          summary: 'Warn',
          detail: 'Debe seleccionar al menos un rol y un recurso.',
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
  
  


  getResouceRoles() {
    this.resourcesService.getRolesResources().subscribe(
      (data) => {
        this.rolresource = data;
        console.log('user-rolget(): ', data);
        // console.log('getResouceRoles: ',this.rolresource)
      },
      error => {
        console.error('Error obteniendo datos desde el backend', error);
      }
    );
  }



  /*==========Funcion para oobtener las opciones para crear asignaciones de 
  ==========================recursos a roles============*/ 
  getResourceRolOptions(){ 
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

    this.resourcesService.getResource().subscribe({
      next: (data) => {
        //console.log('rol1: ',data); // Asegúrate de que data contenga los roles
        this.recursos = data;
        // console.log('get recursos',this.recursos)
        this.resource_op = this.recursos.map(resource => ({ title: resource.title, code: resource.id }));
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });

  }
  /*================================================================================*/ 

  /*=============================METODO ELIMINAR ===================================================*/ 
  eliminar(id: number): void {
    this.resourcesService.deleteRoleResource(id).subscribe(
      () => {
        this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Asignación Eliminada'});
        // Recargar el componente sin recargar toda la aplicación
        this.getResouceRoles();
      },
      err => {
        console.error('Error al eliminar el rol', err);
      }
    );
  }
}