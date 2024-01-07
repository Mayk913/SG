import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { UserI } from 'src/app/models/authorization/usr_User';
import { Router } from '@angular/router';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-mostrarusuarios',
  templateUrl: './mostrarusuarios.component.html',
  styleUrls: ['./mostrarusuarios.component.css']
})
export class MostrarusuariosComponent {
  public usuarios: UserI[] = [];
  public displayedColumns: string[] = ["id", "username", "email"];
  public Dialog = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) { }

  public form:FormGroup=this.formBuilder.group({

    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    

  });

  ngOnInit(): void {
    this.mostrarUsuarios();
  }

  mostrarUsuarios() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.usuarios = data;
        // console.log('usuarios: ',this.usuarios);
      }
    });
  }
  openDialog() {
    this.Dialog = true;
    console.log(this.Dialog)
  }

  eliminar(id: number): void {
    this.userService.eliminarUser(id).subscribe(
      () => {
        this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Usuario Eliminado'});
        // Recargar el componente sin recargar toda la aplicación
        this.mostrarUsuarios();
      },
      err => {
        console.error('Error al eliminar el usuario', err);
      }
    );
  }

  ir_actualizar(id: number) {
    this.router.navigateByUrl(`/dashboard/actualizarUsusarios/${id}`);
  }

  onSubmit(): void {
    const formValue: UserI = this.form.value;
    console.log(formValue);
    this.userService.createUser2(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

        this.messageService.add({severity:'success', summary: 'Success', detail: 'Usuario Creado con exito'});
        this.mostrarUsuarios();
        this.Dialog=false;

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

}
