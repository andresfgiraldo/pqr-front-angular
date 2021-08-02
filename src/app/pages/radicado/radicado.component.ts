import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { RestPqrService } from 'src/app/services/rest-pqr.service';

@Component({
  selector: 'app-radicado',
  templateUrl: './radicado.component.html',
  styleUrls: ['./radicado.component.css']
})
export class RadicadoComponent implements OnInit {

  solicitud: Solicitud;
  solicitud_origen: Solicitud;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _api: RestPqrService
  ) { }

  ngOnInit(): void {
    let radicado = this._activateRoute.snapshot.params.id;
    console.log(radicado);
    this._api.getById(radicado).subscribe(resp => {
      this.solicitud = resp.solicitud
      if (this.solicitud.origen)
        this._api.getById(this.solicitud.origen).subscribe(resp2 => {
          this.solicitud_origen = resp2.solicitud;
        })
    });
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
