import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() ocultarTable: boolean;
  @Output() messageEvent = new EventEmitter<boolean>();

  constructor() { }

  
  ngOnInit() {
  }
  mostrarHome(){
    this.messageEvent.emit(true);
    console.log("mensaje enviado");
  }
}
