import axios from 'axios';

/**
 * Method to consult the value of cryptocurrencies
 * Check information of 3 different apis
 * @returns array of objects with cryptocurrency information
 */
const apiGetPrices = async () => {
  const promises = [];
  promises.push(axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD'));
  promises.push(axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple'));
  promises.push(axios.get('https://public-api.stormgain.com/api/v1/ticker'));
  try {
    const [cryptocompare, coingecko, stormgain] = await Promise.all(promises);
    const {
      data: {
        BTC: {USD: btcCC},
        ETH: {USD: ethCC},
        XRP: {USD: xrpCC},
      }
    } = cryptocompare;

    const {
      data: {
        BTC_USDT: {last_price: btcSG},
        ETH_USDT: {last_price: ethSG},
        XRP_USDT: {last_price: xrpSG},
      }
    } = stormgain;

    const prices = [
      {
        name: 'Bitcoin',
        symbol: 'btc',
        prices: [
          {service: 'CryptoCompare', value: btcCC, url: 'https://www.cryptocompare.com/coins/btc/overview/USDT'},
          {service: 'CoinGecko', value: getValueFromCoinGecko(coingecko.data, 'bitcoin'), url: 'https://www.coingecko.com/en/coins/bitcoin'},
          {service: 'StormGain', value: btcSG, url: 'https://app.stormgain.com/'},
        ]
      },
      {
        name: 'Ethereum',
        symbol: 'eth',
        prices: [
          {service: 'CryptoCompare', value: ethCC, url: 'https://www.cryptocompare.com/coins/eth/overview/USDT'},
          {service: 'CoinGecko', value: getValueFromCoinGecko(coingecko.data, 'ethereum'), url: 'https://www.coingecko.com/en/coins/ethereum'},
          {service: 'StormGain', value: ethSG, url: 'https://app.stormgain.com/'},
        ]
      },
      {
        name: 'XRP',
        symbol: 'xrp',
        prices: [
          {service: 'CryptoCompare', value: xrpCC, url: 'https://www.cryptocompare.com/coins/xrp/overview/USDT'},
          {service: 'CoinGecko', value: getValueFromCoinGecko(coingecko.data, 'ripple'), url: 'https://www.coingecko.com/en/coins/xrp'},
          {service: 'StormGain', value: xrpSG, url: 'https://app.stormgain.com/'},
        ]
      },
    ]

    return prices;
  } catch (err) {
    return [];
  }
};

const getValueFromCoinGecko = (data, currencyName) => {
  const currency = data.find((c) => c.id === currencyName);
  if (currency) {
    return currency.current_price;
  }
  return 0;
}

export default apiGetPrices;
