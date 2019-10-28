import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: "",
    email: ""
  };

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  aplicaCssErro(campo) {
    return {
      'is-invalid': campo.invalid && campo.touched,
      'is-valid': campo.valid && campo.touched
    }
  }

  consultaCEP(cep,formulario) {
    //Nova variável "cep" somente com dígitos.
    var cep = cep.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        this.httpClient.get(`//viacep.com.br/ws/${cep}/json`)
          .pipe(map(dados => dados))
          .subscribe(dados => this.populaDadosForm(dados,formulario));
      }
    }

  }

  populaDadosForm(dados, formulario){
    /*formulario.setValue({
      nome: "",
      email: "",
      endereco: {
        cep: dados.cep,
        numero: "",
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
*/
    formulario.form.patchValue(
      {
        //nome: "",
        //email: "",
        endereco: {
          //cep: dados.cep,
          //numero: "",
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      });

  }

  onSubmit(form) {
    console.log(form.value);

    this.httpClient.post('https://httpbin.org/post', JSON.stringify(form.value))
    .pipe(map(req=>req))//mapear a requisição que será enviada ao server
    .subscribe(dados=> console.log(dados));
  }

}
