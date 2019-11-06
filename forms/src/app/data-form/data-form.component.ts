import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';
import { Observable, empty } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from './service/verifica-email.service';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Estado } from '../shared/models/estado.model';
import { distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  //formulario: FormGroup;
  estados: Observable<Estado[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOpcoes: any[];
  frameworks = ['Angular', 'React', 'Vue', 'Electron'];

  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private dropdownService: DropdownService,
              private cepService: ConsultaCepService,
              private verificarEmailService: VerificaEmailService)
  { super(); }

  ngOnInit()
  {
    //this.verificarEmailService.verificarEmail('email1@gmail.com').subscribe();
    this.newsletterOpcoes = this.dropdownService.getNewsletter();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.estados = this.dropdownService.getEstadosBr();
    /*this.dropdownService.getEstadosBr()
    .subscribe(dados => this.estados = dados);*/

    this.cargos = this.dropdownService.getCargos();
    
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.email, Validators.required],[this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]}),
      cargo: [null],
      tecnologias:[null],
      newsletter:['s'],
      termos:[null, Validators.required],
      frameworks: this.builderFrameworks()
    });

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});
  }

  submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v, i) => v ? this.frameworks[i] : null)
      .filter(v => v !== null)
    });

    console.log(valueSubmit);

    this.httpClient
        .post('https://httpbin.org/post', JSON.stringify({}))
        .subscribe(
          dados => {
            console.log(dados);
            // reseta o form
            // this.formulario.reset();
            // this.resetar();
          },
          (error: any) => alert('erro')
        );
  }

  consultaCEP() {
    //Nova variável "cep" somente com dígitos.
    let cep = this.formulario.get('endereco.cep').value.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep !== "" && cep != null)
    {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
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
  
  setarCargo()
  {
    const cargo = {
      nome: 'Dev',
      nivel: 'Pleno',
      desc: 'Dev Pleno'
    }
    this.formulario.get('cargo').setValue(cargo);
  }

  setarTecnologias()
  {
    this.formulario.get('tecnologias').setValue(['java', 'angular']);
  }

  compararCargos(obj1, obj2)
  {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 && obj2;
  }

  builderFrameworks(){
    const formControlsFramework = this.frameworks.map(framework => new FormControl(false));
    //formControlsFramework[3] = new FormControl(1);
    return this.formBuilder.array(formControlsFramework, FormValidations.requiredMinCheckbox(1));
  }

  validarEmail(formControl : FormControl)
  {
    return this.verificarEmailService.verificarEmail(formControl.value)
      .pipe(map((email: any) => email ? {emailInvalido: true} : null));
  }
}
