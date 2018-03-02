import { Component } from '@angular/core';
import {PostService} from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PostService]

})


export class AppComponent {
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

    this.postService.insertCliente(this.model).subscribe(posts=>{
      this.check= posts;

    });
  }
}

export interface Cliente {
  Nombre: string;
  Apellido: string;
  Cedula: string;
  fecha_Nacimiento: string;
  Usuario: string;
  Contrasena: string;
}
