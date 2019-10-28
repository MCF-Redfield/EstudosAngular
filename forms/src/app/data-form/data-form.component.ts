import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';
import { DropdownService } from '../shared/services/dropdown.service';
import { Estado } from '../shared/models/estado.model';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  estados: Estado[];

  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private dropdownService: DropdownService)
  { }

  ngOnInit()
  {
    this.dropdownService.getEstadosBr()
    .subscribe(dados => this.estados = dados);


    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]})
    });
  }

  onSubmit()
  {
    if(this.formulario.valid)
    {this.httpClient.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .pipe(map(req=>req))//mapear a requisição que será enviada ao server
    .subscribe(dados=>
      {
        console.log(dados);
        this.resetForm();
      },(error: any) => alert("erro de conexão"));
      console.log("FormVálido");
    } else {
      this.verificaCampos(this.formulario);
    }
  }

  verificaCampos(formGrupo: FormGroup)
  {
    Object.keys(formGrupo.controls).forEach(//crio um array com os itens do formGroup(formGroups e formControls)
      campo => { 
        const controle = formGrupo.get(campo) //1 por 1 eu atribuo esses itens a uma variável 
        console.log(controle);
        controle.markAsTouched();// e então posso manipular esse formControl
        // mas se for um formGroup, eu chamo again esse método, para chegar até os formControls q estão dentro dele
        if(controle instanceof FormGroup)
          this.verificaCampos(controle)
      }
    );
  }

  resetForm()
  {
    this.formulario.reset();
  }

  consultaCEP() {
    //Nova variável "cep" somente com dígitos.
    let cep = this.formulario.get('endereco.cep').value.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        this.httpClient.get(`//viacep.com.br/ws/${cep}/json`)
          .pipe(map(dados => dados))
          .subscribe(dados => this.populaDadosForm(dados));
      }
    }
  }

  populaDadosForm(dadosViaCEP)
  {
    this.formulario.patchValue(//set only campos q me forem necessarios setar 
    {
      //nome: "",
      //email: "",
      endereco:
      {
        //cep: dados.cep,
        //numero: "",
        complemento: dadosViaCEP.complemento,
        rua: dadosViaCEP.logradouro,
        bairro: dadosViaCEP.bairro,
        cidade: dadosViaCEP.localidade,
        estado: dadosViaCEP.uf
      }
    });
  }

  aplicaCssFeedback(campo: string)
  {
    if(this.formulario.get(campo).invalid && this.formulario.get(campo).touched)
      return 'is-invalid'; 
    if(this.formulario.get(campo).valid && this.formulario.get(campo).touched)
      return 'is-valid';
  }



}
