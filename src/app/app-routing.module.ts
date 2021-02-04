import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MisApuestasComponent } from './components/mis-apuestas/mis-apuestas.component';
import { LoginComponent } from './components/login/login.component';
import { ApuestasADMComponent } from './components/admin/apuestas-adm/apuestas-adm.component';
import { FreestylersADMComponent } from './components/admin/freestylers-adm/freestylers-adm.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    component: HomeComponent,
    path: ""
  },
  {
    component: FreestylersADMComponent,
    path: "fAdmin/freestylers"
  },
  {
    component: ApuestasADMComponent,
    path: "fAdmin/apuestas"
  },
  {
    component: LoginComponent,
    path: "login"
  },
  {
    component: LoginComponent,
    path: "register"
  },{
    component: MisApuestasComponent,
    path: "mis-apuestas"
  },{
    component: SearchPageComponent,
    path: "search/:search"
  },{
    component: NotFoundComponent,
    path: "**"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
