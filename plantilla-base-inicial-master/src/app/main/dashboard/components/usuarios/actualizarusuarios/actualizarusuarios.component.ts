import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { UserI } from 'src/app/models/authorization/usr_User';
import { Router, ActivatedRoute } from '@angular/router';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-actualizarusuarios',
  templateUrl: './actualizarusuarios.component.html',
  styleUrls: ['./actualizarusuarios.component.css']
})
export class ActualizarusuariosComponent {
  public id: number = 0;
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) { 
    this.form = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password:['', [Validators.required]],
    });
  }

  // public form:FormGroup=this.formBuilder.group({

  //   id:[''],
  //   username: ['', [Validators.required]],
  //   email: ['', [Validators.required]],
  //   password:['', [Validators.required]],
    

  // });
  
  ngOnInit() {
    this.mostrar();
  }

  onSubmit(): void {
    const formValue: UserI = this.form.value;
    this.form.value.id =this.id;
    this.userService.updateUser(formValue).subscribe(
      () => {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Cliente Actualizado' });
        }, 0);
        this.router.navigate(['/dashboard/mostrarUsuarios']);
        
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }


  mostrar(){
    // Utiliza 'params' en lugar de 'queryParams'
    this.route.params.subscribe(params => {
      const id = +params['id']; // '+' para convertir el parámetro a número
  
      if (!isNaN(id)) { // Verifica si 'id' es un número válido
        this.id = id;
        console.log(this.id);
        this.getUser(this.id);
      } else {
        // Manejar el caso en el que 'id' no es un número válido
        console.error('El valor de "id" no es un número válido.');
        console.log('iduser: ', this.id);
      }
    });
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        console.log('Data from service:', data);
  
        if (data ) {
          this.form.patchValue(data);
          // console.log('getuser: ', data);
        } else {
          console.error('El objeto data no tiene la propiedad "id" definida correctamente.');
          
        }
      },
      error: (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    });
  }
  
}
