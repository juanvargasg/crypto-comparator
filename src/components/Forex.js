import React, {useState, useEffect, useCallback} from 'react';
import Input from '../components/Input';
import {validateDecimal} from '../utils/regex';
import apiGetForex from '../api/Forex';
import { currencyFormat } from '../utils/formats';

/**
 * Component for the conversion of Mexican pesos (MXN) to different
 * currencies according to the information on each page
 * @param {array} prices List of prices consulted from the api's
 * @returns Component
 */
const Forex = ({prices}) => {
  const [amountMxn, setAmountMxn] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Perform calculations for each currency in the array and for USD
  const calculate = useCallback(() => {
    const amountMxnDecimal = parseFloat(amountMxn);
    const usd = amountMxnDecimal * exchangeRate;
    const _currencies = [{name: 'USD', value: usd}];
    for (const price of prices) {
      _currencies.push({
        name: price.service,
        value: usd / price.value,
      });
    }
    setCurrencies(_currencies);
  }, [amountMxn, exchangeRate, prices]);

  useEffect(() => {
    if (amountMxn.length > 0) {
      calculate();
    }
  }, [amountMxn, prices, calculate])

  // Get the exchange rate
  const getData = async () => {
    const resp = await apiGetForex();
    setExchangeRate(resp);
  };

  const handleChange = (value) => {
    // It only accepts numbers, decimal point and empty string
    if (validateDecimal(value) || value.length === 0) {
      setAmountMxn(value);
    }
  }

  return (
    <div className="forex">
      <h2 className="text-primary">Convert</h2>
      <div className="description">
        <small>
          Write the amount in Mexican pesos to make the conversion.
        </small>
      </div>
      <Input
        label="MXN"
        id="mxn"
        value={amountMxn}
        required
        onChange={(n, v) => handleChange(v)}
      />
      <table className="table">
        <tbody>
          {currencies.map((curr) => (
            <tr key={curr.name} className="card">
              <th>{curr.name}</th>
              <td>{currencyFormat(curr.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Forex;
