import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Respuesta, Solicitud } from '../interfaces/solicitud';

@Injectable({
  providedIn: 'root'
})
export class RestPqrService {

  private URL_API: string = 'http://localhost:3800/api/pqr/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Respuesta> {
    return this.http.get<Respuesta>(this.URL_API + 'listar');
  }

  getById(id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(this.URL_API + 'buscar/' + id);
  }

  save(solicitud: Solicitud): Observable<Respuesta> {
    return this.http.post<Respuesta>(this.URL_API + 'crear', solicitud);
  }

  update(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(this.URL_API + 'actualizar', solicitud);
  }

  delete(id: number): Observable<Solicitud> {
    return this.http.delete<Solicitud>(this.URL_API + 'borrar/' + id);
  }

}
