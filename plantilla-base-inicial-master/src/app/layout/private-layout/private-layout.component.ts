import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import {
  valorReloj,
  XsegundoService,
} from 'src/app/core/services/reloj/Xsegundo.service';
import { listaMenuI } from 'src/app/models/menu';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { createMenu, listMenu } from 'src/app/consts/menu';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { PersonI } from 'src/app/models/user/person';
import { UserI } from 'src/app/models/authorization/usr_User';

interface menu {
  label: string;
  data?: string;
  expandedIcon: string;
  collapsedIcon: string;
  children?: any[];
}
@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css'],
  providers: [DialogService],
})
export class PrivateLayoutComponent implements OnInit {
  display = true;
  items: MenuItem[] = [];
  items2: MenuItem[] = [];

  public isLoggedIn = false;
  public menu1: listaMenuI[] = [];
  public algo: listaMenuI[] = [];
  public publicMenu: listaMenuI[] = [];
  public privateMenu: listaMenuI[] = [];
  public profileImageUrl = 'assets/demo1.png';
  public ImageUrl = 'assets/demo1.png';
  public nombre: string = 'Demo';
  public subcribe: any;
  public token: string | null = null;
  public displayMaximizable: boolean = true;
  public mostrar: boolean = false;
  public username: string | undefined = undefined;
  public password: string | undefined = undefined;
  public form: FormGroup = this.formBuilder.group({});

  public files1: menu[] = [];
  datos$: Observable<valorReloj> = this.segundo.getInfoReloj();
  hora?: number = 0;
  minutos?: string = '';
  dia?: string = '';
  fecha?: string = '';
  ampm?: string = '';
  segundos?: string = '';
  public ref1: any;
  public image3: string = 'assets/demo1.png';
  public image2: string = 'assets/demo.png';
  public Dialog: boolean = false;
  public Dialog2: boolean = false;
  public bandera: boolean = false;
  private UserId: number = 0;
  // private user: number = 0;
  public mensaje: boolean = false;
  public persona: PersonI = {
    name: '',
    surname: '',
    DocumentTypeId: 0,
    identification: '',
    GenderId: 0,
    address: '',
    phone: '',
    nationality: '',
    date_of_birth: '',
    user: {
        username: '',
        email: '',
        Roles: [],
        avatar: '',
    },
    rolesUsers: [],
};


  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private segundo: XsegundoService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.datos$ = this.segundo.getInfoReloj();
    this.datos$.subscribe((x) => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo;
    });
    this.files1 = [
      {
        label: 'Pictures',
        data: 'Pictures Folder',
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        children: [
          {
            label: 'barcelona.jpg',
            icon: 'pi pi-image',
            data: 'Barcelona Photo',
          },
          { label: 'logo.jpg', icon: 'pi pi-image', data: 'PrimeFaces Logo' },
          { label: 'primeui.png', icon: 'pi pi-image', data: 'PrimeUI Logo' },
        ],
      },
    ];

    this.verificar();
    this.buildForm();

    this.primengConfig.ripple = true;
    this.items2 = [
      {
        label: 'File',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [{ label: 'Project' }, { label: 'Other' }],
          },
          { label: 'Open' },
          { label: 'Quit' },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
        ],
      },
    ];
    this.items = [
      {
        label: 'Configuración',
        icon: 'pi pi-user-edit',
        command: () => {
          this.showConfirm2();
        },
      },
      {
        label: 'Cerrar Sesion',
        icon: 'pi pi-power-off',
        command: () => {
          this.showConfirm();
        },
      },
      { separator: true },
    ];
  }

  ocultarMenu(boolean: boolean) {
    // this.display=boolean
  }

  setLogin(value: boolean): void {
    this.authService.setLogin(value);
  }

  openDialogResgister(event: Event) {
    event.preventDefault();
  }
  public confirm() {
    this.showSuccess();
    this.displayMaximizable = false;
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Ingreso exitoso',
    });
  }
  save(id: string) {}

  openDialogLogin(event: Event) {
    event.preventDefault();
    this.displayMaximizable = true;
  }
  cerrarSesion() {

    this.authService.logout().subscribe({
      next: () => {
        // Limpiar el estado de la sesión en el cliente
        this.setLogin(false);
    
        // Redirigir a la página de login
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Error during logout:', error);
    
        // En caso de error, aún limpiamos el estado de la sesión en el cliente
        this.setLogin(false);
    
        // Redirigir a la página de login
        this.router.navigateByUrl('/login');
      }
    });
    
  }

  showConfirm() {
    this.Dialog = true;
  }
  showConfirm2() {
    this.verificar();
    console.log(this.isLoggedIn);
    this.setIDtoPerson();
    console.log('user: '+ this.UserId);

    this.Dialog2 = true;
  }

  hideDialog() {
    this.Dialog = false;
  }

  public verificar() {
    var token: string | null = localStorage.getItem('token');
    var user: string | null = localStorage.getItem('user');
    var menu: string | null = localStorage.getItem('menu');

    if (token != null && user != null && menu != null) {
      // this.showSuccess();
      let userObjeto: any = JSON.parse(user);
      let menuObjeto: any = JSON.parse(menu);
      // console.log(menuObjeto)
      this.privateMenu = createMenu(menuObjeto) as any;
      this.menu1 = this.privateMenu;
      // console.log(this.privateMenu,'this.privateMenu;')

      // this.menu1 = listMenu
      this.UserId = userObjeto.id;

      this.isLoggedIn = true;
      this.setLogin(true);
    } else {
      this.isLoggedIn = false;
      this.setLogin(false);
      // this.menu1 = [];
      this.menu1 = listMenu;

      // console.log(this.isLoggedIn,'aqui')
      this.router.navigateByUrl('/login');
    }
  }

  setIDtoPerson() {
    this.verificar();
  
    this.userService.getUserById(this.UserId).subscribe({
      next: (userData: PersonI) => {
        // Verifica si el usuario tiene una persona asociada
        if (userData) {
          // Usuario ya tiene una persona asociada
          this.persona.user = {
            id: userData.user?.id,
            username: userData.user?.username,
            email: userData.user?.email,
            Roles: userData.user?.Roles || [],
            avatar: userData.user?.avatar,
          };
          console.log('getUser: ', userData)
  
          // Asigna los valores del usuario al formulario
          this.form.patchValue({
            name: this.persona.name,
            surname: this.persona.surname,
            DocumentTypeId: this.persona.DocumentTypeId,
            identification: this.persona.identification,
            GenderId: this.persona.GenderId,
            address: this.persona.address,
            phone: this.persona.phone,
            nationality: this.persona.nationality,
            date_of_birth: this.persona.date_of_birth,
          });
        } else {
          // No hay persona asociada al usuario
          console.log('No hay persona asociada al usuario');
        }
      },
      error: (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    });
  }
  

  private buildForm() {
    this.form = this.formBuilder.group({
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
  }

 





  crearPersona() {
   
    this.verificar();

    // Crea una nueva persona
    const formValue: PersonI = {
      user: {
        id: this.persona.user?.id, // Aquí asumo que tienes acceso al ID del usuario
        username: this.persona.user?.username,
        email: this.persona.user?.email,
        Roles: this.persona.user?.Roles || [],
        avatar: this.persona.user?.avatar,
      },
      name: this.form.value.name,
      surname: this.form.value.surname,
      DocumentTypeId: +this.form.value.DocumentTypeId,
      identification: this.form.value.identification,
      GenderId: +this.form.value.GenderId,
      address: this.form.value.address,
      phone: this.form.value.phone,
      nationality: this.form.value.nationality,
      date_of_birth: this.form.value.date_of_birth,
    };
    

    if (
      formValue.name !== '' &&
      formValue.surname !== '' &&
      formValue.DocumentTypeId !== 0 &&
      formValue.identification !== '' &&
      formValue.GenderId !== 0 &&
      formValue.phone !== '' &&
      formValue.nationality !== '' &&
      formValue.date_of_birth !== ''
    ) {
      this.bandera = true;

      this.userService.createPerson(formValue).subscribe(
        (resultado) => {
          this.persona=resultado
          console.log(this.persona);
          // Después de crear la persona, actualiza la propiedad User de la instancia PersonI
          // this.persona.User = {
          //   username: this.form.value.username, // Puedes utilizar otro valor si es necesario
          //   email: this.form.value.email,
          //   password: this.form.value.password,
          //   Roles: [], // Puedes asignar los roles aquí si es necesario
          //   avatar: '', // Puedes asignar un valor aquí si es necesario
          // };

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Persona creada exitosamente',
          });
        },
        (error) => {
          // Maneja errores al crear la persona si es necesario
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear la persona',
          });
          console.error(error);
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Faltan datos',
      });
    }
  }

  onSubmit() {
    // Comprueba si el usuario ya tiene una persona asociada
    this.userService.getPersonByUserId(this.UserId).subscribe(
      (persona) => {
        if (persona.user == null || persona.user == undefined) {
          this.crearPersona();
        } else {
          // Ya existe una persona asociada a este usuario, muestra un mensaje de advertencia.
          this.messageService.add({
            severity: 'warn',
            summary: 'Advertencia',
            detail: 'Ya existe una persona asociada a este usuario.',
          });
        }
      },
      (error) => {
        // Maneja errores al obtener la persona si es necesario
        console.error(error);
        if (error.status == 404) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'No se encontró la persona asociada al usuario. Puede continuar con la creación.',
          });
          this.crearPersona();
        }
      }
    );
  }
}
