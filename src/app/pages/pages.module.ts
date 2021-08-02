import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SolicitudComponent } from './solicitud/solicitud.component';
import { ListaComponent } from './lista/lista.component';
import { RadicadoComponent } from './radicado/radicado.component';



@NgModule({
  declarations: [
    SolicitudComponent,
    ListaComponent,
    RadicadoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule, ReactiveFormsModule, RouterModule
  ]
})
export class PagesModule { }
