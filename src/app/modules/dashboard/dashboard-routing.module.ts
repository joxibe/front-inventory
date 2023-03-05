import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';

 const routes: Routes = [
  //Lazy load nos permite cargar algunos componentes, no todos a la vez
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class DashboardRoutingModule { }
