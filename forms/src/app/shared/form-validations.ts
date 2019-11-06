import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations
{
 static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
        let arrayCheckUncheck = formArray.controls.map(current => current.value);
        let totalChecked = arrayCheckUncheck.reduce((total,current) => current ? total + current : total, 0);
        //const totalChecked = arrayCheckUncheck.reduce((total, current) => { if (current) { return total = total + 1 };}, 0)
        //console.log(totalChecked);
        return totalChecked >= min ? null : { required: true};
    };
    return validator;
 }

 static cepValidator(controle: FormControl)
 {
    const cep = controle.value;
    if(cep && cep !== '')
    {
        const validaCep = /^[0-9]{8}$/;
        return validaCep.test(cep) ? null : { cepInvalido : true };
    }
    return null;
 }

 static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo : otherField };
      }

      return null;
    };
    return validator;
  }

 static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      'required': `${fieldName} é obrigatório.`,
      'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      'cepInvalido': 'CEP inválido.',
      'emailInvalido': 'Email já cadastrado!',
      'equalsTo': 'Campos não são iguais',
      'pattern': 'Campo inválido'
    };

    return config[validatorName];
  }
}