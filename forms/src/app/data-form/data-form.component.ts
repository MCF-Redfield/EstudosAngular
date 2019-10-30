import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';
import { DropdownService } from '../shared/services/dropdown.service';
import { Estado } from '../shared/models/estado.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  estados: Observable<Estado[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOpcoes: any[];
  frameworks = ['Angular', 'React', 'Vue', 'Electron'];

  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private dropdownService: DropdownService,
              private cepService: ConsultaCepService)
  { }

  ngOnInit()
  {
    this.newsletterOpcoes = this.dropdownService.getNewsletter();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.estados = this.dropdownService.getEstadosBr();
    /*this.dropdownService.getEstadosBr()
    .subscribe(dados => this.estados = dados);*/

    this.cargos = this.dropdownService.getCargos();
    
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
        estado: [null, Validators.required]}),
      cargo: [null],
      tecnologias:[null],
      newsletter:['s'],
      termos:[null, Validators.required],
      frameworks: this.builderFrameworks()
    });
  }

  onSubmit()
  {
    let copiaFormulario = Object.assign({},this.formulario.value)
    console.log(copiaFormulario);
    copiaFormulario = Object.assign(copiaFormulario,{
      frameworks: copiaFormulario.frameworks
                  .map((copiaFormulario, indice) => copiaFormulario ? this.frameworks[indice] : null)
                  .filter(copiaFormulario => copiaFormulario !== null)});
    console.log(copiaFormulario);


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

  aplicaCssFeedback2(campo: string)
  {
    if(this.formulario.get(campo).value == false)
      {console.log("invalid");return 'is-invalid';} 
    if(this.formulario.get(campo).value == true)
      {console.log("valid");return 'is-valid';}
  }
  
  aplicaCssFeedback3(campo: string)
  {
    console.log("aqui");
    if(this.formulario.get(campo).valid == false)
      {console.log("invalid");return 'is-invalid';} 
    if(this.formulario.get(campo).valid == true)
      {console.log("valid");return 'is-valid';}
  }
  
  aplicaCssFeedback(campo: string)
  {
    if(this.formulario.get(campo).invalid && this.formulario.get(campo).touched)
      return 'is-invalid'; 
    if(this.formulario.get(campo).valid && this.formulario.get(campo).touched)
      return 'is-valid';
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
    return this.formBuilder.array(formControlsFramework, this.requiredMinCheckbox(1));
  }

  requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      let arrayCheckUncheck = formArray.controls.map(current => current.value);
      let totalChecked = arrayCheckUncheck.reduce((total,current) => current ? total + current : total, 0);
      //const totalChecked = arrayCheckUncheck.reduce((total, current) => { if (current) { return total = total + 1 };}, 0)
      //console.log(totalChecked);
      return totalChecked >= min ? null : { required: true};
    };
    console.log(validator);
    return validator;
  }
}
