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

    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    

  });

  ngOnInit(): void {
    this.mostrarUsuarios();
  }

  mostrarUsuarios() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('usuarios: ',this.usuarios);
      }
    });
  }
  openDialog() {
    this.Dialog = true;
  }

  eliminar(id:number){

  }

}
