import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatesComponent } from './states/states.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path : '', component: DashboardComponent},
  {path:'states', component: StatesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
