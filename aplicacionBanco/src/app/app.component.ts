import { Component, OnInit } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import {PostService} from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PostService]

})


export class AppComponent {
  ocultarCarrusel= true;
  ocultarMarketing = true;
  ocultarTable = false;
  creditoCliente:CreditoCliente[];

  receiveMessage($event) {
    this.ocultarCarrusel = $event;
    this.ocultarMarketing = $event;
    this.ocultarTable = !$event;
  }

  recibirDatos($event){
    this.creditoCliente=$event;
  }
  
}

export interface Cliente {
  Nombre: string;
  Apellido: string;
  Cedula: string;
  fecha_Nacimiento: string;
}


export interface Solicitud {
  Cedula: string;
  Empresa: string;
  nit_Empresa: string;
  fecha_Ingreso: string;
  Salario: string;
  fecha_Creacion: string;
}

export interface Credito {
  id_Solicitud: string;
  Cedula: string;
  Cantidad: string;
  fecha_Creacion: string;
}


export interface CreditoCliente{
  id_Solicitud: string;
  Nombre:string,
  Apellido:string,
  Cedula: string;
  Cantidad: string;
}

