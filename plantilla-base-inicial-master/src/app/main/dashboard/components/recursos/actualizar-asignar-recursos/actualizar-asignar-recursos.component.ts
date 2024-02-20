import { Component } from '@angular/core';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { assinRoleResourceI } from 'src/app/models/authorization/usr_assinRoleResource';
import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ResourceI } from 'src/app/models/authorization/usr_resource';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import {Message,MessageService} from 'primeng/api'; 
import { RolesService } from 'src/app/core/services/usuarios/roles.service';

@Component({
  selector: 'app-actualizar-asignar-recursos',
  templateUrl: './actualizar-asignar-recursos.component.html',
  styleUrls: ['./actualizar-asignar-recursos.component.css']
})
export class ActualizarAsignarRecursosComponent {

  public id: number = 0;
  public rolresource: assinRoleResourceI[]=[];
  public recursos: ResourceI[]=[];
  public roles2: RoleI[]=[];
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
  ) { this.form=this.formBuilder.group({
    id:[''],
    

  });}


  
  ngOnInit() {
    this.mostrar();
  }

  mostrar(){
    // Utiliza 'params' en lugar de 'queryParams'
    this.route.params.subscribe(params => {
      const id = +params['id']; // '+' para convertir el parámetro a número
  
      if (!isNaN(id)) { // Verifica si 'id' es un número válido
        this.id = id;
        this.getResource(this.id);
      } else {
        // Manejar el caso en el que 'id' no es un número válido
        console.error('El valor de "id" no es un número válido.');
        console.log('idrecurso: ', this.id);
      }
    });
  }

  onSubmit(){}

  // /*==========Funcion para oobtener las opciones para crear asignaciones de 
  // ==========================recursos a roles============*/ 
  // getResourceRolOptions(){ 
  //   this.rolesService.getRole().subscribe(
  //     (data: RoleI[]) => {
  //       this.roles2 = data;
  //       // console.log('funicona')

  //       // Crea el array de ciudades (nombres de roles) para el p-multiSelect
  //       this.rol_op = this.roles2.map(role => ({ name: role.name, code: role.id }));
  //     },
  //     error => {
  //       console.error('Error obteniendo roles desde el backend', error);
  //     }
  //   );

  //   this.resourcesService.getResource().subscribe({
  //     next: (data) => {
  //       //console.log('rol1: ',data); // Asegúrate de que data contenga los roles
  //       this.recursos = data;
  //       // console.log('get recursos',this.recursos)
  //       this.resource_op = this.recursos.map(resource => ({ title: resource.title, code: resource.id }));
  //     },
  //     error: (error) => {
  //       console.error('Error al obtener roles:', error);
  //     }
  //   });

  // }

  getResource(id: number) {
    this.resourcesService.getOneResource(id).subscribe({
      next: (data) => {
        console.log('Data from service:', data);
  
        if (data ) {
          this.form.patchValue(data);
          console.log('getresource: ', data);
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
