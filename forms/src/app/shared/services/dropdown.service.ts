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

  getCargos()
  {
    return[
      {
        nome: 'Dev',
        nivel: 'Junior',
        desc: 'Dev Junior'
      },
      {
        nome: 'Dev',
        nivel: 'Pleno',
        desc: 'Dev Pleno'
      },
      {
        nome: 'Dev',
        nivel: 'Senior',
        desc: 'Dev Senior'
      },
    ]
  }

  getTecnologias()
  {
    return[
      {
        nome: 'java',
        desc: 'Java'
      },
      {
        nome: 'javascript',
        desc: 'Javascript'
      },
      {
        nome: 'angular',
        desc: 'Angular'
      }
    ]
  }

  getNewsletter()
  {
    return [
      {
        nome: 's',
        desc: 'Sim'
      },
      {
        nome: 'n',
        desc: 'Não'
      }
    ]
  }
}
