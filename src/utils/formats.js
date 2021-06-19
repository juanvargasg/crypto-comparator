/**
 * Format a number as currency
 * @param {string, number} value value to format
 * @param {int} decimalPosition number of decimal places
 * @param {bool} renderSimbol indicates whether to add the $ symbol
 * @returns number string in currency format
 */
const currencyFormat = (value, decimalPosition = 2, renderSimbol = true) => {
  let decimalValue = value;
  if (!decimalValue) {
    decimalValue = 0;
  }
  if (typeof decimalValue === 'string') {
    try {
      decimalValue = decimalValue.replace(',', '');
      decimalValue = parseFloat(decimalValue);
    } catch (error) {
      decimalValue = 0;
    }
  }
  const decimalArray = decimalValue.toString().split('.');
  return `${renderSimbol ? '$' : ''}${decimalArray[0]
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${decimalArray[1] ? `.${decimalArray[1]}` : '.00'}`;
};

export {currencyFormat};
