import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

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

  constructor(private httpClient: HttpClient,
              private cepService: ConsultaCepService)
  { }

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
    cep = cep.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep !== "" && cep != null)
    {
      this.cepService.consultaCEP(cep).subscribe(dados => this.populaDadosForm(dados,formulario));
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
