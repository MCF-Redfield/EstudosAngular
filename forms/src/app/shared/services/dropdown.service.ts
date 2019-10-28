import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private httpClient: HttpClient) { }

  getEstadosBr()
  {
    return this.httpClient.get<Estado[]>('assets/dados/estados.json')
      .pipe(map(res => res));//busco o json,q não vem direto com json, e faço a conversão
  }

}
