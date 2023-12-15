import { Component } from '@angular/core';
import { ResourceI } from 'src/app/models/authorization/usr_resource';

import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';

import { Router, NavigationExtras } from '@angular/router';
import {Message,MessageService} from 'primeng/api'; 


@Component({
  selector: 'app-mostrar-recursos',
  templateUrl: './mostrar-recursos.component.html',
  styleUrls: ['./mostrar-recursos.component.css']
})
export class MostrarRecursosComponent {
  public recursos: ResourceI[]=[];
  public displayedColumns: string[] = ["id", "path","id_parent","method", "icon", "link", "title"]
  public Dialog = false;

  public form:FormGroup=this.formBuilder.group({

    path: ['', [Validators.required]],
    id_parent: ['', [Validators.required]],
    method: ['', [Validators.required]],
    icon: ['', [Validators.required]],
    link: ['', [Validators.required]],
    title: ['', [Validators.required]],

  });

  constructor(
    private resourcesService: ResourcesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) { }


  openDialog() {
    this.Dialog = true;
  }

  ngOnInit(): void {
    this.mostrarRecusos();
  }

  mostrarRecusos() {
    this.resourcesService.getResource().subscribe({
      next: (data) => {
        //console.log('rol1: ',data); // Asegúrate de que data contenga los roles
        this.recursos = data;
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }
  /*===================================METODO ELIMINAR==============================*/
  eliminar(id: number): void {
    this.resourcesService.eliminarResource(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'Rol Eliminado' });
        // Recargar el componente sin recargar toda la aplicación
        this.mostrarRecusos();
      },
      error: (err) => {
        console.error('Error al eliminar el rol', err);
      }
    });
  }
  
  onSubmit(){}

  ir_actualizar(id: number) {
    this.router.navigate([`/dashboard/actualizarRecursos/${id}`]);
  }

}
