import {
  validateDecimal,
  validateEmail,
  validateNumber,
  validatePass,
  validateRfc,
  validateMacAddress,
  validateImei,
  validateCurp,
} from './regex';

const required = (value) => {
  if (typeof value !== 'string') {
    value = value.toString();
  }
  if (value.trim().length === 0) {
    return false;
  }
  return true;
};

const validateUtil = (rules = []) => {
  const errors = {};
  let valid = true;

  rules.forEach((r) => {
    if (
      !r.hasOwnProperty('name') ||
      !r.hasOwnProperty('value') ||
      !r.hasOwnProperty('validations')
    ) {
      return;
    }
    for (const key in r.validations) {
      if (r.validations[key]) {
        switch (key) {
          case 'required':
            if (!required(r.value)) {
              errors[r.name] = 'Este campo es requerido';
              valid = false;
            }
            break;
          case 'length':
            if (required(r.value) && r.value.length !== r.validations[key]) {
              errors[
                r.name
              ] = `Este campo debe ser de ${r.validations[key]} digitos.`;
              valid = false;
            }
            break;
          case 'lengthLessThan':
            if (required(r.value) && r.value.length > r.validations[key]) {
              errors[
                r.name
              ] = `Este campo debe ser de ${r.validations[key]} digitos o menos.`;
              valid = false;
            }
            break;
          case 'email':
            if (required(r.value) && !validateEmail(r.value)) {
              errors[r.name] = 'Formato incorrecto de E-mail.';
              valid = false;
            }
            break;
          case 'rfc':
            if (required(r.value) && !validateRfc(r.value)) {
              errors[r.name] = 'Formato incorrecto de RFC.';
              valid = false;
            }
            break;
          case 'curp':
            if (required(r.value) && !validateCurp(r.value)) {
              errors[r.name] = 'Formato en CURP incorrecto.';
              valid = false;
            }
            break;
          case 'decimal':
            if (
              required(r.value) &&
              !validateDecimal(r.value, r.validations[key])
            ) {
              errors[r.name] = 'No es un numero decimal.';
              valid = false;
            }
            break;
          case 'number':
            if (required(r.value) && !validateNumber(r.value)) {
              errors[r.name] = 'No es un numero.';
              valid = false;
            }
            break;
          case 'password':
            if (required(r.value) && !validatePass(r.value)) {
              errors[r.name] =
                'Debe tener de 5 a 10 caracteres, 1 letra mayúscula, 1 letra minúscula, 1 número y 1 signo (! @ # $ % & * . _)';
              valid = false;
            }
            break;
          case 'macAddress':
            if (required(r.value) && !validateMacAddress(r.value)) {
              errors[r.name] = 'Formato incorrecto de mac address';
              valid = false;
            }
            break;
          case 'imei':
            if (required(r.value) && !validateImei(r.value)) {
              errors[r.name] = 'El IMEI no tiene el formato correcto (numérico de 15 dígitos).';
              valid = false;
            }
            break;
          case 'greaterThan':
            if (
              required(r.value) &&
              validateDecimal(r.value, r.validations[key]) &&
              r.value <= r.validations[key]
            ) {
              errors[
                r.name
              ] = `El valor debe ser mayor que ${r.validations[key]}.`;
              valid = false;
            }
            break;
          case 'equalTo':
            if (required(r.value) && r.value !== r.validations[key]) {
              errors[r.name] = 'Los datos no coinciden.';
              valid = false;
            }
            break;
          default:
            break;
        }
      }
    }
  });

  return {errors, valid};
};

export default validateUtil;
