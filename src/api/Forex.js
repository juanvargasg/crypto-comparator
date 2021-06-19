import axios from 'axios';

/**
 * Check the exchange rate from Mexican pesos to dollars
 * @returns decimal
 */
const apiGetForex = async () => {
  try {
    const resp = await axios.get('https://free.currconv.com/api/v7/convert?q=MXN_USD&compact=ultra&apiKey=1b10d2b3c00416421210')
    return resp.data.MXN_USD;
  } catch (err) {
    return 0;
  }
};

export default apiGetForex;
