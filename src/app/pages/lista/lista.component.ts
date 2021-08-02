import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { RestPqrService } from 'src/app/services/rest-pqr.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  lista: Solicitud[];

  constructor(private _api: RestPqrService,
    private _router: Router) { }

  ngOnInit(): void {

    this._api.getAll().subscribe(resp => this.lista = resp.solicitudes);

  }

  ngOnChange() {
    console.log(this.lista)
  }

  detail(radicado: number): void {
    this._router.navigate(['/radicado', radicado]);
  }

  descTipo(tipo: string): string {
    switch (tipo) {
      case 'P':
        return 'Petición';

      case 'Q':
        return 'Queja';

      case 'R':
        return 'Reclamo';

      default:
        return 'Desconocido';
    }
  }

}
