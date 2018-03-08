import { Component, OnInit, Input } from '@angular/core';
import {CreditoCliente} from '../../../app/app.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() ocultarTable: boolean;
  @Input() creditoCliente:CreditoCliente[];

  constructor() { }

  ngOnInit() {
  }

}
