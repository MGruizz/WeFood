import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './pages/login/login.component';
import { InfoRecetaComponent } from './pages/info-receta/info-receta.component';
import { CreacionEdicionRecetaComponent } from './pages/creacion-edicion-receta/creacion-edicion-receta.component';
import { CreacionUsuarioComponent } from './pages/creacion-usuario/creacion-usuario.component';

const routes: Routes = [
  {path:'', component: InicioComponent },
  {path:'perfil', component: PerfilComponent },
  {path:'login', component: LoginComponent},
  {path:'info-receta', component: InfoRecetaComponent},
  {path:'creacion-edicion-receta', component: CreacionEdicionRecetaComponent},
  {path:'creacion-usuario', component: CreacionUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
