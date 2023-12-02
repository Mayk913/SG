import { Component } from '@angular/core';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';

import { Router } from '@angular/router';
import {Message,MessageService} from 'primeng/api'; 


@Component({
  selector: 'app-mostrar-roles',
  templateUrl: './mostrar-roles.component.html',
  styleUrls: ['./mostrar-roles.component.css']
})
export class MostrarRolesComponent {
  public roles:RoleI[] = []
  public displayedColumns: string[] = ["id", "name"]
  constructor(
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.mostrarRoles();
  }

  mostrarRoles() {
    this.rolesService.getRole().subscribe({
      next: (data) => {
        console.log('rol1: ',data); // Asegúrate de que data contenga los roles
        this.roles = data;
        console.log('roles en el componente: ',this.roles);
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }
  
}
