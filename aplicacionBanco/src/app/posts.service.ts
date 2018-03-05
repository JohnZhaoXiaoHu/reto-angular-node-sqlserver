import {Injectable} from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { Cliente } from './app.component'



@Injectable()
export class PostService {
  constructor(private http: HttpClient){}

  getPost(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/cliente');
  }
  
  insertCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8080/cliente/create', cliente);
  }

}
