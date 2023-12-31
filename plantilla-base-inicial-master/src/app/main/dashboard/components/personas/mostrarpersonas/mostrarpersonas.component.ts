import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { PersonI } from 'src/app/models/user/person';
import { Router } from '@angular/router';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-mostrarpersonas',
  templateUrl: './mostrarpersonas.component.html',
  styleUrls: ['./mostrarpersonas.component.css']
})
export class MostrarpersonasComponent implements OnInit {
  public personas: PersonI[] = [];
  public displayedColumns: string[] = ["id", "name", "surname","document_type" ,"identification","date_of_birth","address", "phone_number", "user", "nationality", "date_of_birth", "Acciones"];
  public Dialog = false;

  public form:FormGroup=this.formBuilder.group({

    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    DocumentTypeId: ['', [Validators.required]],
    identification: ['', [Validators.required]],
    GenderId: ['', [Validators.required]],
    // address:['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    nationality: ['', [Validators.required]],
    date_of_birth: ['', [Validators.required]],
    password: ['', [Validators.required]],
      //password2: ['', [Validators.required]],
    documentTypeId: ['', [Validators.required]],

  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) { }

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
  openDialog() {
    this.Dialog = true;
  }

  onSubmit(){

  }

  //eliminar persoanas
  eliminar(id: number): void {
    this.userService.deletePerson(id).subscribe(
      () => {
        console.log("wngfiedrbgn")
        

        // Actualizar la lista de personas después de la eliminación
        this.mostrarPersonas();
        this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'Persona Eliminado'});
      },
      (err) => {
        console.log('Error al eliminar la persona', err);
      }
    );
  }

}
