import { Component, ViewChild, OnInit } from '@angular/core';
import {PostService} from '../../../app/posts.service';
import { NgForm, Form, FormGroup, FormsModule} from '@angular/forms';
import {Cliente} from  '../../../app/app.component';
import {Solicitud} from  '../../../app/app.component';
import {Credito} from  '../../../app/app.component';

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
  mensaje3="Este campo es requerido";
  check: Cliente;
  model:any = {};
  model2:any= {};
  check2:Solicitud;
  seEncuetraCedula:boolean = false;
  seEncuetraUsuario:boolean = false;
  seEncuentraCedulaSolicitud:boolean=false;
  constructor( private postService:PostService){


    this.postService.getPost().subscribe(posts=>{
    this.clientes= posts;

    });
  }

  insertarSolicitud(){
    for (var i = 0; i < this.clientes.length; i++) {

      if(this.model2.Cedula == this.clientes[i].Cedula){
        this.seEncuentraCedulaSolicitud=true;
      }
    }

    if(this.seEncuentraCedulaSolicitud){
      this.postService.insertSolicitud(this.model2).subscribe(posts=>{
        console.log(posts);
        this.check2= posts;
        console.log("solicitud creada exitosamente!!");
      });
      this.seEncuentraCedulaSolicitud=false;
    }else{
      this.model2.Cedula="";
      this.mensaje3="No se encuetra registrada la cedula en el sistema!!";
    }




  }

  insertarCliente(form: NgForm){


    for (var i = 0; i < this.clientes.length; i++) {

      if(this.model.Cedula == this.clientes[i].Cedula){
        this.seEncuetraCedula=true;
      }

      if(this.model.Usuario == this.clientes[i].Usuario){
        this.seEncuetraUsuario=true;
      }
      

    }  


    if(!this.seEncuetraCedula && !this.seEncuetraUsuario){
      console.log("la cedula y el usuario no son repetidos!!");
      this.postService.insertCliente(this.model).subscribe(posts=>{
        console.log(posts);
        this.check= posts;
      });
    }
    
    if(this.seEncuetraCedula){
      alert("Cedula repetida");
      console.log("la cedula esta repetida!!"+this.seEncuetraCedula);
      this.model.Cedula='';
      this.mensaje1 = "Ya existe esta Cedula";
      this.seEncuetraCedula=false;
    }

    if(this.seEncuetraUsuario){
      alert("usuario repetido");
      console.log("el usuario esta repetido!!"+this.seEncuetraUsuario);
      this.model.Usuario='';
      this.mensaje2 = "Ya existe este Usuario";
      this.seEncuetraUsuario=false;
    }

  }

  borrarForm(form: NgForm){
    form.resetForm(); // or form.reset();
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

