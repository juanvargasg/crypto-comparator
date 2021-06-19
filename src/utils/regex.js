const DECIMAL_REGEX = /^\d+\.?\d{0,2}$/i;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validateDecimal = (value) => value.match(DECIMAL_REGEX);

const validateEmail = (value) => value.match(EMAIL_REGEX);

export {
  DECIMAL_REGEX,
  EMAIL_REGEX,
  validateDecimal,
  validateEmail,
};
