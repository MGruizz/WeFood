import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component'
import { PerfilComponent } from './pages/perfil/perfil.component';
const routes: Routes = [
  {path:'', component: InicioComponent },
  {path:'perfil', component: PerfilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
