import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';
@Component({
  selector: 'app-actualizar-roles',
  templateUrl: './actualizar-roles.component.html',
  styleUrls: ['./actualizar-roles.component.css']
})
export class ActualizarRolesComponent {
  public id: number =0;

  public form:FormGroup=this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required]],

  });

  constructor(
    private route: ActivatedRoute,  // Usar ActivatedRoute en lugar de Router
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private rolesService: RolesService,
  ) { }

  ngOnInit() {
   
    this.id = this.route.snapshot.queryParams['id'];
    this.form = this.formBuilder.group({
      id: [this.id],
      name: ['', [Validators.required]],
    });
    this.getRol(this.id);
    console
  }
  
  
  

  
  getRol(id: number){
    this.rolesService.getOneRole(id)
    .subscribe({
      next: (data) => {
        this.form.setValue(data.role)
        console.log('getrole: ', data.role)
      }
    })
  }

  onSubmit(): void {
    const formValue: RoleI = this.form.value;
    const id: number =  this.form.value.id
    this.rolesService.updateRole(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
        setTimeout(()=>{                  
          this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Actualizado', life:5000});

     }, 0);
        this.router.navigateByUrl('clientes');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }
}
