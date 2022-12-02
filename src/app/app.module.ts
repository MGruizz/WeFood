import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './pages/login/login.component';
import { InfoRecetaComponent } from './pages/info-receta/info-receta.component';
import { CreacionEdicionRecetaComponent } from './pages/creacion-edicion-receta/creacion-edicion-receta.component';
import { CreacionUsuarioComponent } from './pages/creacion-usuario/creacion-usuario.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import { DietaComponent } from './pages/dieta/dieta.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AuthGuard} from "./services/auth/auth.guard";
import {TokenInterceptorService} from "./services/auth/token-interceptor.service";
import { ModaleditarpefilComponent } from './components/modaleditarpefil/modaleditarpefil.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PerfilComponent,
    LoginComponent,
    InfoRecetaComponent,
    CreacionEdicionRecetaComponent,
    CreacionUsuarioComponent,
    HeaderComponent,
    FooterComponent,
    DietaComponent,
    ModaleditarpefilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
