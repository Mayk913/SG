import { Component } from '@angular/core';
import { ResourceI } from 'src/app/models/authorization/usr_resource';
import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';




@Component({
  selector: 'app-actualizar-recursos',
  templateUrl: './actualizar-recursos.component.html',
  styleUrls: ['./actualizar-recursos.component.css']
})
export class ActualizarRecursosComponent {

  public id: number = 0;


  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private resourcesService: ResourcesService,
  ) { this.form=this.formBuilder.group({
    id:[''],
    path: ['', [Validators.required]],
    id_parent: ['', [Validators.required]],
    method: ['', [Validators.required]],
    icon: ['', [Validators.required]],
    link: ['', [Validators.required]],
    title: ['', [Validators.required]],

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


  onSubmit(): void {
    const formValue: ResourceI = this.form.value;
    const id: number = this.form.value.id;
    this.resourcesService.updateResource(formValue).subscribe(
      () => {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Recurso Actualizado' });
        }, 0);
        this.router.navigate(['/dashboard/mostrarRecursos']);
        
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

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
