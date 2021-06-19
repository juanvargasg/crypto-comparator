const DECIMAL_REGEX = /^\d+\.?\d{0,2}$/i;
const DECIMAL3_REGEX = /^\d+\.?\d{0,3}$/i;
const NUMBER_REGEX = /^[0-9]*$/i;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const RFC_REGEX = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
const USER_REGEX = /^[a-zA-Z0-9]{10}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.&*_])(?=.{5,10})/;
const MAC_ADDRESS_REGEX = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
const IMEI_REGEX = /^(([0-9]){15})$/;
const CURP_REGEX = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

const validateDecimal = (value, numbersOfDecimals = 2) => {
  if (numbersOfDecimals === 2) {
    return value.match(DECIMAL_REGEX);
  }
  return value.match(DECIMAL3_REGEX);
};

const validateNumber = (value) => value.match(NUMBER_REGEX);

const validateEmail = (value) => value.match(EMAIL_REGEX);

const validateRfc = (value) => value.match(RFC_REGEX);

const validateUser = (value) => value.match(USER_REGEX);

const validatePass = (value) => value.match(PASS_REGEX);

const validateMacAddress = (value) => value.match(MAC_ADDRESS_REGEX);

const validateImei = (value) => value.match(IMEI_REGEX);

const validateCurp = (value) => value.match(CURP_REGEX);

export {
  DECIMAL_REGEX,
  NUMBER_REGEX,
  EMAIL_REGEX,
  RFC_REGEX,
  USER_REGEX,
  PASS_REGEX,
  MAC_ADDRESS_REGEX,
  IMEI_REGEX,
  CURP_REGEX,
  validateDecimal,
  validateNumber,
  validateEmail,
  validateRfc,
  validateUser,
  validatePass,
  validateMacAddress,
  validateImei,
  validateCurp,
};
