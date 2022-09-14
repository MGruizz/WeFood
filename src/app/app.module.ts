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
import { PassRecoveryComponent } from './pages/pass-recovery/pass-recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PerfilComponent,
    LoginComponent,
    InfoRecetaComponent,
    CreacionEdicionRecetaComponent,
    CreacionUsuarioComponent,
    PassRecoveryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
