// asignar-roles.component.ts

import { Component } from '@angular/core';
import { assinRoleUserI } from 'src/app/models/usr_assinRoleUser';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-asignar-roles',
  templateUrl: './asignar-roles.component.html',
  styleUrls: ['./asignar-roles.component.css']
})
export class AsignarRolesComponent {

  public roles: assinRoleUserI[] = [];

  constructor(
    private rolesService: RolesService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getRolesFromBackend();
  }

  getRolesFromBackend() {
    this.rolesService.getUserRolesData().subscribe(
      (data) => {
        this.roles = data;
        console.log('user-rolget(): ', data);
        console.log(this.roles)
      },
      error => {
        console.error('Error obteniendo datos desde el backend', error);
      }
    );
  }
}
