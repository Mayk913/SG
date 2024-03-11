import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';

@Component({
  selector: 'app-actualizar-roles',
  templateUrl: './actualizar-roles.component.html',
  styleUrls: ['./actualizar-roles.component.css']
})
export class ActualizarRolesComponent implements OnInit {
  public id: number = 0;
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private rolesService: RolesService,
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.mostrar();
  }


  mostrar(){
    // Utiliza 'params' en lugar de 'queryParams'
    this.route.params.subscribe(params => {
      const id = +params['id']; // '+' para convertir el parámetro a número
  
      if (!isNaN(id)) { // Verifica si 'id' es un número válido
        this.id = id;
        this.getRol(this.id);
      } else {
        // Manejar el caso en el que 'id' no es un número válido
        console.error('El valor de "id" no es un número válido.');
        console.log('idRol: ', this.id);
      }
    });
  }

  getRol(id: number) {
    this.rolesService.getOneRole(id).subscribe({
      next: (data) => {
        console.log('Data from service:', data);
  
        if (data ) {
          this.form.setValue(data);
          console.log('getrole: ', data);
        } else {
          console.error('El objeto data no tiene la propiedad "id" definida correctamente.');
          
        }
      },
      error: (error) => {
        console.error('Error al obtener el rol:', error);
      }
    });
  }
  
  

  onSubmit(): void {
    const formValue: RoleI = this.form.value;
    const id: number = this.form.value.id;
    this.rolesService.updateRole(formValue).subscribe(
      () => {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Cliente Actualizado' });
        }, 0);
        this.router.navigate(['/dashboard/mostrarRoles']);
        
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }
}
