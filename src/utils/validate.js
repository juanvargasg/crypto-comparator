import {validateEmail} from './regex';

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
              errors[r.name] = 'This field is required';
              valid = false;
            }
            break;
          case 'length':
            if (required(r.value) && r.value.length !== r.validations[key]) {
              errors[
                r.name
              ] = `This field must be ${r.validations[key]} digits.`;
              valid = false;
            }
            break;
          case 'email':
            if (required(r.value) && !validateEmail(r.value)) {
              errors[r.name] = 'Wrong e-mail format.';
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
