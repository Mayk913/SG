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

  onSubmit(){}


  getResouceRoles() {
    this.resourcesService.getRolesResources().subscribe(
      (data) => {
        this.rolresource = data;
        // console.log('user-rolget(): ', data);
        console.log('getResouceRoles: ',this.rolresource)
      },
      error => {
        console.error('Error obteniendo datos desde el backend', error);
      }
    );
  }



  /*==========Funcion para oobtener la lista de recursos asignados a roles============*/ 
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
        console.log('get recursos',this.recursos)
        this.resource_op = this.recursos.map(recurso => ({ title: recurso.title, code: recurso.id }));
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });

  }
  /*================================================================================*/ 
}
