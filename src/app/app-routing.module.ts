import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './pages/login/login.component';
import { InfoRecetaComponent } from './pages/info-receta/info-receta.component';
import { CreacionEdicionRecetaComponent } from './pages/creacion-edicion-receta/creacion-edicion-receta.component';
import { CreacionUsuarioComponent } from './pages/creacion-usuario/creacion-usuario.component';
import {AuthGuard} from "./services/auth/auth.guard";
import {AdminComponent} from "./pages/admin/admin.component";
import {BuscadorComponent} from "./pages/buscador/buscador.component";

const routes: Routes = [
  {path:'', component: LoginComponent },
  {path:'inicio', component: InicioComponent },
  {path:'perfil', component: PerfilComponent , canActivate:[AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'info-receta', component: InfoRecetaComponent},
  {path:'creacion-edicion-receta', component: CreacionEdicionRecetaComponent , canActivate:[AuthGuard]},
  {path:'creacion-usuario', component: CreacionUsuarioComponent},
  {path:'admin', component: AdminComponent},
  {path:'buscador', component: BuscadorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
