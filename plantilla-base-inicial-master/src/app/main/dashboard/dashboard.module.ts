import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SplitterModule } from 'primeng/splitter';
import { MenubarModule } from 'primeng/menubar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';

import { GeneralComponent } from './components/escritorio/general/general.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarusuariosComponent } from './components/usuarios/mostrarusuarios/mostrarusuarios.component';
import { ActualizarusuariosComponent } from './components/usuarios/actualizarusuarios/actualizarusuarios.component';
import { EliminarusuariosComponent } from './components/usuarios/eliminarusuarios/eliminarusuarios.component';
import { MostrarpersonasComponent } from './components/personas/mostrarpersonas/mostrarpersonas.component';
import { ActualizarpersonasComponent } from './components/personas/actualizarpersonas/actualizarpersonas.component';
import { EliminarpersonasComponent } from './components/personas/eliminarpersonas/eliminarpersonas.component';
import { MostrarRolesComponent } from './components/roles/mostrar-roles/mostrar-roles.component';
import { ActualizarRolesComponent } from './components/roles/actualizar-roles/actualizar-roles.component';
import { EliminarRolesComponent } from './components/roles/eliminar-roles/eliminar-roles.component';
import { MostrarRecursosComponent } from './components/recursos/mostrar-recursos/mostrar-recursos.component';
import { ActualizarRecursosComponent } from './components/recursos/actualizar-recursos/actualizar-recursos.component';
import { EliminarRecursosComponent } from './components/recursos/eliminar-recursos/eliminar-recursos.component';
import { AsignarRolesComponent } from './components/roles/asignar-roles/asignar-roles.component';
import { AsignarRecursosComponent } from './components/recursos/asignar-recursos/asignar-recursos.component';
import { ActualizarAsignarRecursosComponent } from './components/recursos/actualizar-asignar-recursos/actualizar-asignar-recursos.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GeneralComponent,
    MostrarusuariosComponent,
    ActualizarusuariosComponent,
    EliminarusuariosComponent,
    MostrarpersonasComponent,
    ActualizarpersonasComponent,
    EliminarpersonasComponent,
    MostrarRolesComponent,
    ActualizarRolesComponent,
    EliminarRolesComponent,
    MostrarRecursosComponent,
    ActualizarRecursosComponent,
    EliminarRecursosComponent,
    AsignarRolesComponent,
    AsignarRecursosComponent,
    ActualizarAsignarRecursosComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    FormsModule,
    MultiSelectModule,
    ReactiveFormsModule,
    InputTextareaModule,
    DividerModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    RippleModule,
    InputTextModule,
  
    CardModule,
    MenuModule,
    MessagesModule,
    MessageModule,

    SplitterModule,
    MenubarModule,
    AvatarGroupModule,
    AvatarModule,
    SidebarModule,
    PanelMenuModule,
    ChartModule,
    ToolbarModule,
    SplitButtonModule,
    DialogModule,
    ConfirmPopupModule,
    ToastModule,
    TreeModule,
    SharedModule,
    // VirtualScrollerModule,
    TableModule,
    KeyFilterModule,
    DropdownModule,
    CalendarModule,
    FieldsetModule,
    FileUploadModule
  ],
  
  // providers: [DynamicDialogRef,DynamicDialogConfig]
})
export class DashboardModule { }
