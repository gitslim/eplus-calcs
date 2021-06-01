import {Injectable} from "@angular/core";
import {FormGroup, ValidatorFn, AbstractControl} from "@angular/forms";

@Injectable()
export class ValidationService {

  constructor() {
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Обязательное поле',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Неправильный email',
      'invalidPhone': 'Введите 6-11 цифр номера телефона',
      'invalidPhoneOrEmail': 'Введите правильный телефон (6-11 цифр) или email',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Не короче ${validatorValue.requiredLength} символов`,
      'maxlength': `Не длиннее ${validatorValue.requiredLength} символов`,
      'mustChoose': 'Выберите значение',
      'invalidInt': 'Введите целое число',
      'invalidFloat': 'Введите числовое значение',
      'maxValue': `Введите число не больше ${validatorValue.max}`,
      'minValue': `введите число не меньше ${validatorValue.min}`
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return {'invalidCreditCard': true};
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (!!control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  static phoneValidator(control) {
    // RFC 2822 compliant regex
    if (!!control.value && control.value.replace(/-/g, '').match(/[0-9]{6,11}/)) {
      return null;
    } else {
      return {'invalidPhone': true};
    }
  }

  static phoneOrEmailValidator(control) {
    if (ValidationService.phoneValidator(control) == null || ValidationService.emailValidator(control) == null) {
      return null;
    }
    return {'invalidPhoneOrEmail': true}
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }

  static mustChooseValidator(c: FormGroup) {
    let ret = <any>{'mustChoose': {valid: false}};
    Object.keys(c.controls).forEach(key => {
      if (c.controls[key].value) {
        ret = null;
      }
    });
    return ret;
  }

  static intValidator(control) {
    try {
      if (control.value == Math.abs(parseInt(control.value))) {
        return null;
      }
    } catch (e) {
      return {'invalidInt': true};
    }
    return {'invalidInt': true};
  }

  static floatValidator(control) {
    try {
      if (control.value == Math.abs(parseFloat(control.value))) {
        return null;
      }
    } catch (e) {
      return {'invalidFloat': true};
    }
    return {'invalidFloat': true};
  }

  static maxValue(max: Number): ValidatorFn {
    return (control: AbstractControl): any => {
      const input = control.value,
        isValid = input > max;
      return isValid ? {'maxValue': {max}} : null;
    };
  }

  static minValue(min: Number): ValidatorFn {
    return (control: AbstractControl): any => {
      const input = control.value,
        isValid = input < min;
      return isValid ? {'minValue': {min}} : null;
    };
  }

}
