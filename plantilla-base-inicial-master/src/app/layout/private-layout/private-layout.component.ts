
import {  MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { valorReloj, XsegundoService } from 'src/app/core/services/reloj/Xsegundo.service';
import { listaMenuI } from 'src/app/models/menu';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { createMenu, listMenu } from 'src/app/consts/menu';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
interface menu{
  label:string,
  data?:string
  expandedIcon: string,
  collapsedIcon:string,
  children?:any[]
}
@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css'],
  providers: [DialogService]
})
export class PrivateLayoutComponent implements OnInit {
  display=true
  items: MenuItem[]=[];
  items2: MenuItem[]=[];

  public isLoggedIn = false;
  public menu1: listaMenuI[] = [];
  public algo:listaMenuI[] = [];
  public publicMenu: listaMenuI[] = [];
  public privateMenu: listaMenuI[] = [];
  public profileImageUrl = 'assets/demo1.png';
  public ImageUrl = 'assets/demo1.png';
  public nombre:string = 'Demo';
  public subcribe:any;
  public token: string | null=null;
  public displayMaximizable:boolean =true
  public mostrar:boolean =false;
  public username: string | undefined=undefined
  public  password: string | undefined=undefined
  public form: FormGroup = this.formBuilder.group({});

  public files1:menu[]=[]
  datos$: Observable<valorReloj>=this.segundo.getInfoReloj();
  hora?: number=0;
  minutos?: string='';
  dia?: string='';
  fecha?: string='';
  ampm?: string='';
  segundos?: string='';
  public ref1:any;
  public image3:string='assets/demo1.png'
  public image2:string='assets/demo.png'
  public Dialog:boolean =false
  public Dialog2:boolean =false
  public bandera: boolean = false;
  private UserId:number=0
  public mensaje:boolean=false


  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private authService: AuthService, 
    private userService: UserService,
    private router:Router,
    private segundo: XsegundoService,
    public dialogService: DialogService,

  ) { 

  }

  ngOnInit  () {
    this.datos$=this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo
    });
    this.files1=
        [
            {
                "label": "Pictures",
                "data": "Pictures Folder",
                "expandedIcon": "pi pi-folder-open",
                "collapsedIcon": "pi pi-folder",
                "children": [
                    {"label": "barcelona.jpg", "icon": "pi pi-image", "data": "Barcelona Photo"},
                    {"label": "logo.jpg", "icon": "pi pi-image", "data": "PrimeFaces Logo"},
                    {"label": "primeui.png", "icon": "pi pi-image", "data": "PrimeUI Logo"}]
            },

    ]

    this.verificar()


  this.primengConfig.ripple = true;
  this.items2 = [
    {
        label: 'File',
        items: [{
                label: 'New', 
                icon: 'pi pi-fw pi-plus',
                items: [
                    {label: 'Project'},
                    {label: 'Other'},
                ]
            },
            {label: 'Open'},
            {label: 'Quit'}
        ]
    },
    {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
            {label: 'Delete', icon: 'pi pi-fw pi-trash'},
            {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
    }
  ];
  this.items = [
    {label: 'Configuración', icon: 'pi pi-user-edit', command: () => {
      this.showConfirm2();
  } },
    {label: 'Cerrar Sesion', icon: 'pi pi-power-off', command: () => {
      this.showConfirm();
  }},
    {separator: true},
   
  ];
  

}

ocultarMenu(boolean: boolean){
// this.display=boolean
}



setLogin(value: boolean): void {
this.authService.setLogin(value);
}

openDialogResgister(event: Event){
event.preventDefault();


}
public confirm() {
this.showSuccess()
this.displayMaximizable=false
}
showSuccess() {
this.messageService.add({severity:'success', summary: 'Success', detail: 'Ingreso exitoso'});
}
save(id:string){

}

openDialogLogin(event: Event){
event.preventDefault();
this.displayMaximizable=true
}
cerrarSesion(){
this.setLogin(false)
this.authService.logout()
this.ngOnInit()
this.router.navigateByUrl('/login')
}

showConfirm() {
  this.Dialog = true;
  
}
showConfirm2() {
  this.Dialog2 = true;
  
}

hideDialog() {
  this.Dialog = false;
}


 public verificar(){
  var token :string | null= localStorage.getItem('token');
  var user :string | null= localStorage.getItem('user');
  var menu :string | null= localStorage.getItem('menu');

if(token!=null && user!=null && menu != null){
    this.showSuccess()
  let userObjeto:any = JSON.parse(user); 
  let menuObjeto:any = JSON.parse(menu);
// console.log(menuObjeto)
  this.privateMenu=createMenu(menuObjeto) as any;
  this.menu1 = this.privateMenu;
// console.log(this.privateMenu,'this.privateMenu;')

  // this.menu1 = listMenu
  this.UserId=userObjeto.id

  this.isLoggedIn=true
  this.setLogin(true) 
  }else{
    this.isLoggedIn=false
    this.setLogin(false) 
    // this.menu1 = [];
  this.menu1 = listMenu

    // console.log(this.isLoggedIn,'aqui')
    this.router.navigateByUrl('/login');
  }
}
onSubmit() {
  //  let bandera= this.verificar()

  //  if(bandera == true){
  // let value = this.form.value.email1.split('@');
  //  let result = this.form.value.email1.substring(1, this.form.value.email1.split('@'));
  // value=value.slice(1)
  // console.log(value[0])
  let formValue = {
    username: this.form.value.username,
    //surname: this.form.value.surname,
    //DocumentTypeId: this.form.value.DocumentTypeId,
    //identification: this.form.value.identification,
    // GenderId: this.form.value.GenderId.id,
    // address: this.form.value.address,
    // phone: this.form.value.phone,
    email: this.form.value.email1,
    password: this.form.value.password,
    // nationality: this.form.value.nationality,
    // date_of_birth: this.form.value.date_of_birth,
  };

  // if(this.form.value.password !== this.form.value.password2){
  //   this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Contraseñas No Coinciden'});

  // }else{

  if (
    formValue.username != '' &&
    //formValue.surname != ""&&
    //formValue.DocumentTypeId != ( 0 || undefined)&&
    //formValue.identification != ""&&   esto es temporal
    // formValue.GenderId != ( 0 || undefined)&&
    // formValue.address != ""&&
    // formValue.phone != ""&&
    formValue.email != '' &&
    formValue.password != ''
    // &&
    // formValue.nationality != "" &&
    // formValue. date_of_birth!= ""
  ) {
    this.bandera = true;
    console.log(formValue);

    this.userService.createUser(formValue).subscribe(
      (algo) => {
        var date = new Date('2020-01-01 00:00:03');
        function padLeft(n: any) {
          return (n = '00'.substring(0, '00'.length - n.length) + n);
        }
        var interval = setInterval(() => {
          var minutes = padLeft(date.getMinutes() + '');
          var seconds = padLeft(date.getSeconds() + '');
          if (seconds == '03') {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Registro de Usuario Creado con exito',
            });
          }
          if (seconds == '01') {
            this.bandera = false;
          }
          date = new Date(date.getTime() - 1000);
          if (minutes == '00' && seconds == '01') {
            this.bandera = false;
            this.router.navigateByUrl('/login');
            clearInterval(interval);
          }
        }, 1000);
      },
      async (error) => {
        if (error != undefined) {
          if (error != undefined) {
            if (error.error.dataErros) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Error. ${error.error.dataErros[0].message}`,
              });
            }
            if (error.error.message) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Error. ${error.error.message}`,
              });
            }
            console.log(error);
          }
          this.bandera = false;
        }
      }
    );
  } else {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'Faltan datos',
    });
    this.bandera = false;
  }
  //}
}
}