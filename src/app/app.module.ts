import { ShorterDirective } from './directives/shorter_text.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/home/search/search.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApuestasComponent } from './components/apuestas/apuestas.component';
import { FreestylersADMComponent } from './components/admin/freestylers-adm/freestylers-adm.component';
import { ApuestasADMComponent } from './components/admin/apuestas-adm/apuestas-adm.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { MisApuestasComponent } from './components/mis-apuestas/mis-apuestas.component';
import { CardComponent } from './components/mis-apuestas/card/card.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    SearchComponent,
    ApuestasComponent,
    FreestylersADMComponent,
    ApuestasADMComponent,
    LoginComponent,
    FooterComponent,
    ShorterDirective,
    MisApuestasComponent,
    CardComponent,
    SearchPageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
