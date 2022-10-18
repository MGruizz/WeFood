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
import {HttpClientModule} from "@angular/common/http";

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
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
