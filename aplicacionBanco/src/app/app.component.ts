import { Component } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import {PostService} from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PostService]

})


export class AppComponent {
  /*
  title = 'Banco Melo';
  clientes: Cliente[];
  cliente1: Cliente;
  check: Cliente;
  model:any = {};

  constructor( private postService:PostService){

    this.postService.getPost().subscribe(posts=>{
    this.clientes= posts;

    });
  }
  insertarCliente(){
    this.cliente1 = {Nombre: 'camilo', Apellido: 'ramirez', Cedula: '1094952179', fecha_Nacimiento: '10-10-10', Usuario: 'perreq'};
    this.postService.insertCliente(this.cliente1).subscribe(posts=>{
      this.check= posts;
      
    });
  }
  
}
*/
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

