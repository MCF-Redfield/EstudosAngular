import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private httpClient: HttpClient) { }

  consultaCEP(cep: string) {
    //Nova variável "cep" somente com dígitos.
    cep.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep))
      {
        return this.httpClient.get(`//viacep.com.br/ws/${cep}/json`)
          .pipe(map(dados => dados));
      }
    }
  }

}
