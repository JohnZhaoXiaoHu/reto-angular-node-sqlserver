import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../../app/posts.service';
import { NgForm, Form, FormGroup, FormsModule } from '@angular/forms';
import { Cliente } from '../../../app/app.component';
import { Solicitud } from '../../../app/app.component';
import { Credito } from '../../../app/app.component';
import { VALID } from '@angular/forms/src/model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [PostService]

})

export class NavbarComponent implements OnInit {
  clientes: Cliente[];

  mensajeUsuarioCliente = "Este campo es requerido";
  mensajeModal1 = "";
  mensajeModal2 = "";
  mensajeCedulaSolicitud = "";

  check: Cliente;
  check2: Solicitud;
  model: any = {};
  model2: any = {};
  model3: any = {};
  
  seEncuetraCedula: boolean = false;
  seEncuetraUsuario: boolean = false;
  seEncuentraCedulaSolicitud: boolean = false;
  seEncuentraSalario: boolean = true;
  seEncuentraCedulaCredito: boolean = false;

  fechactual: string;
  mayor18: boolean;
  fechactual1: string;
  
  credito: Credito = { id_Solicitud: "", Cedula: "", Cantidad: "", fecha_Creacion: "" };
  cedLastUserReg: String = "";

  colorMen: String;
  llave: boolean=false;
  llave2: boolean=false;
  
  public mask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];

  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private postService: PostService) { }

  salarioVacio() {
    if (this.model2.Salario == null || isNaN(this.model2.Salario)) {
      this.seEncuentraSalario = false;
    } else {
      this.seEncuentraSalario = true;
    }
    //console.log(this.model2.Salario);
    //console.log(this.seEncuentraSalario);
  }

  insertarSolicitud() {
    this.mensajeModal1 = "";
    this.mensajeModal2 = "";
    //this.model2.nit_Empresa = this.nit1 + "" + this.nit2 + "" + this.nit3 + "-" + this.nit4;
    //console.log("nit de la empresa:" + this.model2.nit_Empresa);

    if (this.seEncuentraCedulaSolicitud) {
      this.model2.fecha_Creacion = new Date().toLocaleString();

      this.postService.insertSolicitud(this.model2).subscribe(posts => {


        //console.log("respuesta del back:" + posts);
        this.check2 = posts;
        if (this.antiguedadAñoYmedio() && this.model2.Salario >= 800000) {
          let prestamo: string;
          this.mensajeModal1 = "Crédito aprobado";
          this.colorMen="#0fad00";          

          if (this.model2.Salario >= 800000 && this.model2.Salario < 1000000) {
            prestamo = '5.000.000';
            this.mensajeModal2 = " por el monto de $ 5.000.000";
          } else if (this.model2.Salario >= 1000000 && this.model2.Salario < 4000000) {
            prestamo = '20.000.000';
            this.mensajeModal2 = " por el monto de $ 20.000.000";
          } else if (this.model2.Salario >= 4000000) {
            prestamo = '50.000.000';
            this.mensajeModal2 = " por el monto de $ 50.000.000";
          }

          console.log("fecha creacion solicitud:" + this.model2.fecha_Creacion);
          this.credito.id_Solicitud = this.model2.fecha_Creacion;
          this.credito.Cedula = this.model2.Cedula;
          this.credito.Cantidad = prestamo;
          this.credito.fecha_Creacion = new Date().toLocaleString();
          this.insertarCredito();
          //console.log("solicitud creada exitosamente!!");
        } else {
          this.mensajeModal1 = "Crédito no aprobado";
          this.colorMen="red";
          if(!this.antiguedadAñoYmedio()){
            this.mensajeModal2 = "Debido a que no lleva trabajando más de un año y medio";
          }
          if(this.model2.Salario < 800000){
            this.mensajeModal2 = "Debido a que su salario es menor a $ 800.000";
          }
          
        }

      });
    }
  }

  insertarCredito() {
    this.postService.insertCredito(this.credito).subscribe(data => {
      console.log("credito exitosamente ingresado!!");
    });
  }

  insertarCliente() {
    this.mensajeModal1 = "";
    this.mensajeModal2 = "";
    if (!this.seEncuetraCedula) {
      this.postService.insertCliente(this.model).subscribe(posts => {
        console.log("respuesta del server:" + posts);
        this.check = posts;
        this.mensajeModal1 = "Registro aprobado";
        this.mensajeModal2 = this.model.Nombre+" "+this.model.Apellido+" has sido agregado exitosamente";
        this.colorMen="#0fad00";
        this.cedLastUserReg = this.model.Cedula;
      });
    }


  }

  resetForm(form: NgForm) {
    form.resetForm(); // or form.reset();
  }



  verificarCedulaCliente() {
    this.seEncuetraCedula = false;
    //console.log("cambio el campo cedula:" + this.model.cedula);
    if (this.model.Cedula.length >= 6) {

      this.postService.buscarClientePorCedula(this.model.Cedula).subscribe(data => {
        console.log(data);
        if (data[0]) {
          if (this.model.Cedula == data[0].Cedula) {
            console.log("Si existe la cedula");
            this.seEncuetraCedula = true;
          }
        }

      });
    }

  }

  verificarCedulaSolicitud() {

    //console.log("cambio el campo cedula:" + this.model2.cedula);
    if (this.model2.Cedula.length >= 6) {

      this.postService.buscarClientePorCedula(this.model2.Cedula).subscribe(data => {

        console.log(data);
        if (data[0]) {
          if (this.model2.Cedula == data[0].Cedula) {
            console.log("Si existe la cedula");
            this.seEncuentraCedulaSolicitud = true;
          }
        }
        else {
          this.seEncuentraCedulaSolicitud = false;
        }

      });
    }
  }

  verificarCedulaCredito() {

    //console.log("cambio el campo cedula:" + this.model3.Cedula);
    if (this.model3.Cedula.length >= 6) {

      this.postService.buscarClientePorCedula(this.model3.Cedula).subscribe(data => {

        console.log(data);
        console.log("cambio el campo cedula:" + this.model3.Cedula);
        if (data[0]) {
          if (this.model3.Cedula == data[0].Cedula) {
            console.log("Si existe la cedula");
            this.seEncuentraCedulaCredito = true;
          }
        }
        else {
          this.seEncuentraCedulaCredito = false;
          console.log("No existe la cedula");
        }

      });
    }
  }
  mostrarCreditos(){
    this.messageEvent.emit(false);
    console.log("mensaje enviado");
  }

  nuevaSolicitud(form: NgForm){
    this.model2.Salario=null;
    this.model2.fecha_Ingreso=" ";
    this.llave=true;
  }

  ngOnInit() {

    this.fechactual = new Date().toString();
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



    this.fechactual1 = ((new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() - 1)).toString();
    if ((new Date().getMonth() + 1) < 10 && (new Date().getDate()) < 10) {
      this.fechactual1 = ((new Date().getFullYear()) + "-" + "0" + (new Date().getMonth() + 1) + "-" + "0" + (new Date().getDate() - 1)).toString();

    } else if ((new Date().getMonth() + 1) < 10) {
      this.fechactual1 = ((new Date().getFullYear()) + "-" + "0" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() - 1)).toString();
    } else if (new Date().getDate() < 10) {
      this.fechactual1 = ((new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" + "0" + (new Date().getDate() - 1)).toString();
    }
    else {
      this.fechactual1 = ((new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() - 1)).toString();
    }


  }


  onChangeFecha(): void {
    //console.log(this.model.fecha_Nacimiento)
    let fechaNacimiento: Date = new Date(this.model.fecha_Nacimiento);
    //console.log(new Date(((new Date().getFullYear() - 18) + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDay())) < fechaNacimiento)
    this.mayor18 = (new Date(((new Date().getFullYear() - 18) + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate())) > fechaNacimiento)

    if (!this.mayor18) {
      // alert("La fecha ingresada no corresponde a una persona mayor de edad");
      this.model.fecha_Nacimiento = null;
    }


  }

  vte: boolean;
  fecha3: Date;
  antiguedadAñoYmedio(): boolean {

    let fecha: Date = new Date(this.model2.fecha_Ingreso);



    if (new Date().getMonth() < 6) {

      let fecha2: Date = new Date(((new Date().getFullYear() - 2) + "/" + (12 - (6 - (new Date().getMonth() + 1)) + "/" + new Date().getDate())));

      this.vte = (new Date(((new Date().getFullYear() - 2) + "/" + (12 - (6 - (new Date().getMonth() + 1)) + "/" + new Date().getDate()))) > fecha);
    } else {
      this.vte = (new Date(((new Date().getFullYear() - 1) + "/" + (new Date().getMonth() - 6) + "/" + new Date().getDate())) > fecha);
    }
    return this.vte;
  }



}

