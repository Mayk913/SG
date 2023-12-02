import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './components/escritorio/general/general.component';
import { MostrarpersonasComponent } from './components/personas/mostrarpersonas/mostrarpersonas.component';
import { ActualizarpersonasComponent } from './components/personas/actualizarpersonas/actualizarpersonas.component';
import { EliminarpersonasComponent } from './components/personas/eliminarpersonas/eliminarpersonas.component';
import { MostrarRolesComponent } from './components/roles/mostrar-roles/mostrar-roles.component';
import { DashboardComponent } from './dashboard.component';
import { ActualizarRolesComponent } from './components/roles/actualizar-roles/actualizar-roles.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
        //universidad
        {
          path: 'aspecto_general',
          component: GeneralComponent,
        },
        {
          path:'mostrarpersonas',
          component: MostrarpersonasComponent,
        },
        {
          path:'actualizarpersonas',
          component: ActualizarpersonasComponent,
        },
        {
          path:'eliminarpersonas',
          component: EliminarpersonasComponent,
        },
        {
          path:'mostrarRoles',
          component: MostrarRolesComponent,
        },
        {
          path:'actualizarRoles',
          component: ActualizarRolesComponent,
        },
        ]
      }
];

  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
