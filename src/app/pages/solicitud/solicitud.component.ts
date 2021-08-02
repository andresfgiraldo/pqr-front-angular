import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { RestPqrService } from 'src/app/services/rest-pqr.service';
import * as moment from 'moment';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  pqrForm: FormGroup;
  solicitud: Solicitud;
  solicitud_origen: Solicitud;
  mensaje: string = "Crear nueva solicitud";
  mensaje2: string = "";
  enviado: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _api: RestPqrService) {

    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.pqrForm = this._formBuilder.group({
      tipo: new FormControl("",
        Validators.compose([
          Validators.required,
        ]
        )
      ),
      requerimiento: new FormControl("",
        Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
      origen: new FormControl("",
        Validators.compose([
          Validators.min(0),
          Validators.pattern('[0-9]*'),
          Validators.minLength(4)
        ]))
    })
  }

  crearPqr() {

    if (this.pqrForm.valid) {

      this.solicitud = {
        tipo: this.pqrForm.get('tipo').value,
        requerimiento: this.pqrForm.get('requerimiento').value,
        origen: +this.pqrForm.get('origen').value
      };

      console.log(this.solicitud)

      const valido = new Promise((resolve, reject) => {
        if (['Q', 'R'].includes(this.solicitud.tipo)) {

          if (this.solicitud.origen <= 0) {
            this.mensaje2 = 'En caso de peticiones y reclamos debe indicar el numero de radicado de la solicitud inicial'
            resolve(false);
          } else {
            this._api.getById(this.solicitud.origen).subscribe(o => {
              this.solicitud_origen = o.solicitud;
              let dias = moment(Date.now()).diff(moment(this.solicitud_origen.fecha_sistema), 'days');
              console.log(o, dias)
              if (dias < 5) {
                this.mensaje2 = 'El recurso anterior aun no tiene 5 días de antelación. No puede se puede crear un nuevo recurso'
                resolve(false);
              } else {
                resolve(true);
              }
            });
          }
        } else {
          resolve(true);
        }
      });



      valido.then(v => {
        if (v) {
          this._api.save(this.solicitud).subscribe(
            resp => {
              console.log(resp);
              this.solicitud = resp.solicitud;
              if (resp.status == 'success') {
                this.mensaje = 'Solicitud creada con éxito';
                this.mensaje2 = `Radicado #${this.solicitud.radicado}`
                this.pqrForm.controls['tipo'].disable();
                this.pqrForm.controls['requerimiento'].disable();
                this.pqrForm.controls['origen'].disable();
                this.enviado = true;
              } else {
                this.mensaje = 'Error creando solicitud';
                this.mensaje2 = resp.error
              }
            }
          );
        }
      });

    } else {
      console.log("formulario no es válido")
    }

  }

}
