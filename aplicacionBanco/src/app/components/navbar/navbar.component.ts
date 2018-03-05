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
  mensaje4="";
  check: Cliente;
  model:any = {};
  model2:any= {};
  check2:Solicitud;
  seEncuetraCedula:boolean = false;
  seEncuetraUsuario:boolean = false;
  seEncuentraCedulaSolicitud:boolean=false;
  nit1:string;
  nit2:string;
  nit3:string;
  nit4:string;
  fechactual:string;
  mayor18:boolean;
  fechactual1:string;
  credito:Credito;
  constructor( private postService:PostService){
    
    this.postService.getPost().subscribe(posts=>{
    this.clientes= posts;

    });
  }



  insertarSolicitud(){
    this.mensaje4="";
    this.model2.nit_Empresa=this.nit1+""+this.nit2+""+this.nit3+"-"+this.nit4;
    console.log("nit de la empresa:"+this.model2.nit_Empresa);
    
    this.seEncuentraCedulaSolicitud=false;
    for (var i = 0; i < this.clientes.length; i++) {

      if(this.model2.Cedula == this.clientes[i].Cedula){
        this.seEncuentraCedulaSolicitud=true;
      }
    }

    if(this.seEncuentraCedulaSolicitud){
      this.postService.insertSolicitud(this.model2).subscribe(posts=>{
        console.log("respuesta del back:"+posts);
        this.check2= posts;

        if(this.antiguedadAñoYmedio() && this.model2.Salario >=800000){
          this.mensaje4="Credito aceptado";
          if(this.model2.Salario>=800000 && this.model2.Salario <1000000){
              this.mensaje4+="\n por el monto de 5000000";
          }else if(this.model2.Salario>=1000000 && this.model2.Salario <4000000){
            this.mensaje4+="\n por el monto de 20000000";
          }else if(this.model2.Salario >=4000000){
            this.mensaje4+="\n por el monto de 50000000";
          }
          console.log("solicitud creada exitosamente!!");
        }else{
          this.mensaje4="Credito no aceptado";
        }

      });
      this.seEncuentraCedulaSolicitud=false;
    }else{
      this.model2.Cedula="";
      this.mensaje3="No se encuetra registrada la cedula en el sistema!!";
    }

  }

  insertarCliente(){
    this.mensaje4="";
    this.seEncuetraCedula=false;
    this.seEncuetraUsuario=false;

    for (var i = 0; i < this.clientes.length; i++) {
      console.log(this.model.Cedula+"-"+this.clientes[i].Cedula);
      if(this.model.Cedula == this.clientes[i].Cedula){
        this.seEncuetraCedula=true;
      }
      console.log(this.model.Usuario+"-"+this.clientes[i].Usuario);
      if(this.model.Usuario == this.clientes[i].Usuario){
        this.seEncuetraUsuario=true;
      }
      

    }  

    if(this.seEncuetraCedula){
      //alert("Cedula repetida");
      //console.log("la cedula esta repetida!!"+this.seEncuetraCedula);
      this.model.Cedula='';
      this.mensaje1 = "Ya existe esta Cedula";
    }

    if(this.seEncuetraUsuario){
      //alert("usuario repetido");
      //console.log("el usuario esta repetido!!"+this.seEncuetraUsuario);
      this.model.Usuario='';
      this.mensaje2 = "Ya existe este Usuario";
    }

    if(!this.seEncuetraCedula && !this.seEncuetraUsuario){
      //console.log("la cedula y el usuario no son repetidos!!");
      this.postService.insertCliente(this.model).subscribe(posts=>{
        //console.log(posts);
        this.check= posts;
        this.mensaje4="Usuario ingresado exitosamente!!";
      });
    
    }
    
    

  }

  borrarForm(form: NgForm){
    form.resetForm(); // or form.reset();
  }

  registrarse(){
    this.mensaje1 = "Este campo es requerido";
    this.mensaje2 = "Este campo es requerido";
    this.mensaje3 = "Este campo es requerido";
      console.log("pidiendo los clientes");
    this.postService.getPost().subscribe(posts=>{
      this.clientes= posts;
        console.log(this.clientes);
      });
  }
 

  ngOnInit() {

    this.fechactual= new Date().toString();
    this.fechactual = ((new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()).toString();
    if ((new Date().getMonth() + 1) < 10 && (new Date().getDate()) < 10) {
      this.fechactual = ((new Date().getFullYear()) + "-" + "0" + (new Date().getMonth() + 1) + "-" + "0" + new Date().getDate()).toString();

    } else if ((new Date().getMonth() + 1) < 10) {
      this.fechactual = ((new Date().getFullYear()) + "-" + "0" + (new Date().getMonth() + 1) + "-" + new Date().getDate()).toString();
    } else if (new Date().getDate() < 10) {
      this.fechactual = ((new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" + "0" + new Date().getDate()).toString();
    }
    else {
      this.fechactual = ((new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()).toString();
    }

  

    this.fechactual1 = ((new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate()-1)).toString();
    if ((new Date().getMonth() + 1) < 10 && (new Date().getDate()) < 10) {
      this.fechactual1 = ((new Date().getFullYear()) + "-" + "0" + (new Date().getMonth() + 1) + "-" + "0" +  (new Date().getDate()-1)).toString();

    } else if ((new Date().getMonth() + 1) < 10) {
      this.fechactual1 = ((new Date().getFullYear()) + "-" + "0" + (new Date().getMonth() + 1) + "-" +  (new Date().getDate()-1)).toString();
    } else if (new Date().getDate() < 10) {
      this.fechactual1 = ((new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" + "0" +  (new Date().getDate()-1)).toString();
    }
    else {
      this.fechactual1 = ((new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" +  (new Date().getDate()-1)).toString();
    }


  }


  onChangeFecha():void{
      console.log(this.model.fecha_Nacimiento)
      let fechaNacimiento:Date =new Date(this.model.fecha_Nacimiento);
      console.log(new Date(((new Date().getFullYear()-18) + "/" + (new Date().getMonth() +1) + "/" + new Date().getDay()))<fechaNacimiento)
      this.mayor18 = (new Date(((new Date().getFullYear() - 18) + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate())) > fechaNacimiento)

    if (!this.mayor18) {
      // alert("La fecha ingresada no corresponde a una persona mayor de edad");
      this.model.fecha_Nacimiento = null;
    }


  }

  vte:boolean;
  fecha3:Date;
antiguedadAñoYmedio(): boolean {
 
console.log(this.model2.fecha_Ingreso);
let fecha: Date = new Date(this.model2.fecha_Ingreso);

console.log(fecha);

console.log("mes:"+new Date().getMonth());

if(new Date().getMonth()<6){
  console.log("mes:"+new Date().getMonth());
  let fecha2:Date=new Date(((new Date().getFullYear() - 2) + "/" + (12-(6-(new Date().getMonth()+1)) + "/" + new Date().getDate())));
  console.log(6-(new Date().getMonth()+1));
  console.log(fecha2);
  this.vte = (new Date(((new Date().getFullYear() - 2) + "/" + (12-(6-(new Date().getMonth()+1)) + "/" + new Date().getDate()))) > fecha);
}else{
  this.vte = (new Date(((new Date().getFullYear() - 1) + "/" + (new Date().getMonth()-6) + "/" + new Date().getDate())) > fecha);
}


console.log(this.vte);
return this.vte;
} 
 

   
}

