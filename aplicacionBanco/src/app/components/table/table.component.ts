import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, Form, FormGroup, FormsModule } from '@angular/forms';
import {CreditoCliente} from '../../../app/app.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [NavbarComponent]

})
export class TableComponent implements OnInit {

 // seEncuentraSalario1: boolean = true;
  //model4: any = {};
  
  @Input() ocultarTable: boolean;
  @Input() creditoCliente:CreditoCliente[];
  @Output() messageEvent = new EventEmitter<boolean>();


  constructor(private NavbarComponent: NavbarComponent) { }

  
  ngOnInit() {
  }

  mostrarHome(){
    this.messageEvent.emit(true);
    this.NavbarComponent.tablaActiva=false;
    console.log("mensaje enviado");
  }

  /*
  salarioVacio1() {
    if (this.model4.Salario1 == null || isNaN(this.model4.Salario1)) {
      this.seEncuentraSalario1 = false;
    } else {
      this.seEncuentraSalario1 = true;
    }
    //console.log(this.model2.Salario);
    //console.log(this.seEncuentraSalario);
  }*/
}
