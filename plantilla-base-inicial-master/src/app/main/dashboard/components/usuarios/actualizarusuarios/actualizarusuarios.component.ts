import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { UserI } from 'src/app/models/authorization/usr_User';
import { Router } from '@angular/router';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-actualizarusuarios',
  templateUrl: './actualizarusuarios.component.html',
  styleUrls: ['./actualizarusuarios.component.css']
})
export class ActualizarusuariosComponent {

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

  onSubmit(){
    
  }

}
