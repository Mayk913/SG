import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { ResourceI } from 'src/app/models/authorization/usr_resource';
import { assinRoleResourceI } from 'src/app/models/authorization/usr_assinRoleResource';

@Component({
  selector: 'app-actualizar-asignar-recursos',
  templateUrl: './actualizar-asignar-recursos.component.html',
  styleUrls: ['./actualizar-asignar-recursos.component.css']
})
export class ActualizarAsignarRecursosComponent implements OnInit {

  public id: number = 0;
  public rolresource: assinRoleResourceI[] = [];
  public recursos: ResourceI[] = [];
  public roles2: RoleI[] = [];
  public rol_op: any[] = [];
  public resource_op: any[] = [];
  public Dialog = false;

  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private resourcesService: ResourcesService,
    private rolesService: RolesService,
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      role_id: ['', [Validators.required]],
      resource_id: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.mostrar();
    this.getResourceRolOptions();
    
  }

  mostrar() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
  
      if (!isNaN(id)) {
        this.id = id;
        this.getRolResource(this.id);
      } else {
        console.error('El valor de "id" no es un número válido.');
        console.log('idrecurso: ', this.id);
      }
    });
  }

  onSubmit() {
    // Lógica para actualizar la asignación de recursos a roles
    // Puedes utilizar this.form.value para obtener los valores del formulario
    // y luego llamar al servicio correspondiente para realizar la actualización.
  }

  getResourceRolOptions() {
    this.rolesService.getRole().subscribe(
      (data: RoleI[]) => {
        this.roles2 = data;
        this.rol_op = this.roles2.map(role => ({ name: role.name, code: role.id }));
      },
      error => {
        console.error('Error obteniendo roles desde el backend', error);
      }
    );

    this.resourcesService.getResource().subscribe({
      next: (data) => {
        this.recursos = data;
        this.resource_op = this.recursos.map(resource => ({ title: resource.title, code: resource.id }));
      },
      error: (error) => {
        console.error('Error al obtener recursos:', error);
      }
    });
  }

  // getRolResource(id: number) {
  //   this.resourcesService.getRoleResourceById(id).subscribe({
  //     next: (data) => {
  //       if (data) {
  //         console.log( data)
  //         this.form.setValue(data);
  //         // this.form.patchValue({
  //         //   id: data.id,
  //         //   role_Id: data.role_Id,  // Ajusta esto según las propiedades reales de 'data'
  //         //   resource_Id: data.resource_Id,  // Ajusta esto según las propiedades reales de 'data'
  //         // });
  //       } else {
  //         console.error('El objeto data no tiene la propiedad "id" definida correctamente.');
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error al obtener el recurso:', error);
  //     }
  //   });
  // }
  getRolResource(id: number) {
    this.resourcesService.getRoleResourceById(id).subscribe({
<<<<<<< HEAD
      next: (data) => {
        if (data) {
          console.log(data);
          const formValue = {
            id: data.id,
            role_id: data.role_id,  // Ajusta esto según las propiedades reales de 'data'
            resource_id: data.resource_id,  // Ajusta esto según las propiedades reales de 'data'
          };
          this.form.setValue(formValue);
=======
      next: (data:assinRoleResourceI) => {
        if (data) {
          console.log('datafromfuntion:', data)
          this.form.patchValue({
            id: data.id,
            role_Id: data.role_id,  // Ajusta esto según las propiedades reales de 'data'
            resource_Id: data.resource_id,  // Ajusta esto según las propiedades reales de 'data'
          });
>>>>>>> 9ed58d6585b338d523a48bfe42f9cb73f2b8ec8b
        } else {
          console.error('El objeto data no tiene la propiedad "id" definida correctamente.');
        }
      },
      error: (error) => {
        console.error('Error al obtener el recurso:', error);
      }
    });
  }
  
}
