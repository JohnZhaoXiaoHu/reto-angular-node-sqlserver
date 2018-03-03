import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../app/posts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [PostService]

})
export class NavbarComponent implements OnInit {
  clientes: Cliente[];
  mensaje1 = "Este campo es requerido";
  mensaje2 = "Este campo es requerido";
  check: Cliente;
  model:any = {};
  
  constructor( private postService:PostService){
    

    this.postService.getPost().subscribe(posts=>{
    this.clientes= posts;

    });
  }
  borrarcampos(){
    this.model={};
    this.mensaje1 = "Este campo es requerido";
    this.mensaje2 = "Este campo es requerido";
  }

  insertarCliente(){
    var seEncuetra=false;
    var i;
    var length = this.clientes.length;
    for (i = 0; i < length; i++) {
      if(this.model.Cedula == this.clientes[i].Cedula){
        this.mensaje1 = "Ya existe la cedula";
        //alert("Ya existe el usuario");
        seEncuetra=true;
        this.model.Cedula='';
      }
      if(this.model.Usuario == this.clientes[i].Usuario){
        this.mensaje2 = "Ya existe el usuario";
        //alert("Ya existe el usuario");
        seEncuetra=true;
        this.model.Usuario='';
      }
    }  


    if(!seEncuetra){
      this.postService.insertCliente(this.model).subscribe(posts=>{
        this.check= posts;
      });
      
    }
  
  }

  fechactual:string;
  fechaInput:string;
  ngOnInit() {
    this.fechactual = new Date().toString();
    // this.fechactual = new Date().toString();
  }

  onChangeFecha():void{
      console.log(this.fechaInput)
      let fechaNacimiento:Date =new Date(this.fechaInput);
      console.log(new Date(((new Date().getFullYear()-18) + "/" + (new Date().getMonth() +1) + "/" + new Date().getDay()))<fechaNacimiento)
      
  }

}
export interface Cliente {
  Nombre: string;
  Apellido: string;
  Cedula: string;
  fecha_Nacimiento: string;
  Usuario: string;
}
