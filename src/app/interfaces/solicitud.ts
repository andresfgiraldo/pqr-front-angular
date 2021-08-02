export interface Solicitud {
  _id?: string;
  fecha_sistema?: Date;
  radicado?: number;
  tipo: string;
  requerimiento: string;
  respuesta?: string;
  origen?: number;
}


export interface Respuesta {
  status: string;
  message?: string;
  error?: string;
  data?: any;
  solicitud?: Solicitud;
  solicitudes?: Solicitud[];
}