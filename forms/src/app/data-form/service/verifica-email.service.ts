import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private httpClient: HttpClient) { }

  verificarEmail(email: string)
  {
    let i=1;
    return this.httpClient.get('assets/dados/emails.json')
    .pipe(
      //faço a leitura do emails.json e pego somente as informaçoes
      //que estiverem dentro do array "emails" 
      map((item: any) => item.emails),
      tap(console.log),//imprime o que o map acima está retornando
      //o map acima me retornou um array chamado "email"
      //"email" é meu "item" abaixo, um array mesmo
      map((item: any[]) => item.filter((item: any) => item.email===email)),
      //tap(console.log),
      map((item : any[]) => item.length > 0)
      );
  }

}
