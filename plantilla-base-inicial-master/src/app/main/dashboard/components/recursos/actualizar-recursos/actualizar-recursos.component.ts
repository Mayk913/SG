import { Component } from '@angular/core';

import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';

import { Router, NavigationExtras } from '@angular/router';
import {Message,MessageService} from 'primeng/api'; 

@Component({
  selector: 'app-actualizar-recursos',
  templateUrl: './actualizar-recursos.component.html',
  styleUrls: ['./actualizar-recursos.component.css']
})
export class ActualizarRecursosComponent {
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


  onSubmit(){}
}
