import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, Form, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  seEncuentraSalario1: boolean = true;
  model4: any = {};

  @Input() ocultarTable: boolean;
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor() { }

  
  ngOnInit() {
  }

  resetForm(form: NgForm) {
    form.resetForm(); // or form.reset();
  }

  mostrarHome(){
    this.messageEvent.emit(true);
    console.log("mensaje enviado");
  }
  salarioVacio1() {
    if (this.model4.Salario1 == null || isNaN(this.model4.Salario1)) {
      this.seEncuentraSalario1 = false;
    } else {
      this.seEncuentraSalario1 = true;
    }
    //console.log(this.model2.Salario);
    //console.log(this.seEncuentraSalario);
  }
}
