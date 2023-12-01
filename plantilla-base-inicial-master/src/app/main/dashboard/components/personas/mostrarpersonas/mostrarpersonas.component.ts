import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { PersonI } from 'src/app/models/user/person';

@Component({
  selector: 'app-mostrarpersonas',
  templateUrl: './mostrarpersonas.component.html',
  styleUrls: ['./mostrarpersonas.component.css']
})
export class MostrarpersonasComponent implements OnInit {
  public personas: PersonI[] = [];
  public displayedColumns: string[] = ["id", "name", "surname","document_type" ,"identification","date_of_birth","address", "phone_number", "user", "nationality", "date_of_birth", "Acciones"];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.mostrarPersonas();
  }

  mostrarPersonas() {
    this.userService.getPeople().subscribe({
      next: (data) => {
        this.personas = data;
        console.log('personas: ',this.personas);
      }
    });
  }
}
