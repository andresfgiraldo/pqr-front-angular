import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './pages/lista/lista.component';
import { RadicadoComponent } from './pages/radicado/radicado.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';

const routes: Routes = [
  {
    path: 'solicitud',
    component: SolicitudComponent
  },
  {
    path: 'lista',
    component: ListaComponent
  },
  {
    path: 'radicado/:id',
    component: RadicadoComponent
  },
  {
    path: '**',
    redirectTo: '/solicitud'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
