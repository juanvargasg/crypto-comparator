import React, {useState, useEffect, useContext, useCallback} from 'react';
import Icon from '../components/Icon';
import apiGetPrices from '../api/Prices';
import AuthContext from '../contexts/AuthContext';
import coingecko from '../images/coingecko.png';
import cryptocompare from '../images/cryptocompare.png';
import stormgain from '../images/stormgain.png';
import {currencyFormat} from '../utils/formats';
import Forex from '../components/Forex';

const Dashboard = () => {
  const {auth, logout} = useContext(AuthContext);

  const [prices, setPrices] = useState([]);
  const [selected, setSelected] = useState('btc');
  const [selectedObj, setSelectedObj] = useState({});
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    // Get the initial data
    getData();
    // Update data every 15 seconds
    const interval = setInterval(() => {
      getData();
    }, 15000);
    return () => clearInterval(interval)
  }, []);

  // Change the currency that is being displayed
  const changeCurrency = useCallback((symbol) => {
    const currency = prices.find((p) => p.symbol === symbol);
    if (currency) {
      setSelectedObj(currency);
    }
  }, [prices]);

  useEffect(() => {
    changeCurrency(selected)
  }, [prices, selected, changeCurrency])

  /**
   * Function that performs the consumption of APIs
   * Update the date of the last update
   */
  const getData = async () => {
    const resp = await apiGetPrices();
    setPrices(resp);
    const date = new Date();
    setLastUpdate(date.toLocaleString('en-us'));
  }

  const getImage = (service) => {
    switch (service) {
      case 'CryptoCompare':
        return cryptocompare;
      case 'CoinGecko':
        return coingecko;
      case 'StormGain':
        return stormgain;
      default:
        break;
    }
  }

  return (
    <div className="dashboard-container">
      <div className="content">
        <nav className="header">
          <h2 className="text-primary">CryptoComparator</h2>
          <button className="btn btn-secondary btn-sign-out" onClick={logout}>
            <span>Logout</span>
            <Icon name="sign-out-alt" />
          </button>
        </nav>
        <h3 className="text-color">
          {`Welcome ${auth.user.firstName}, select a cryptocurrency`}
        </h3>
        <div className="currencies">
          <button
            className={`btn btn-${selected === 'btc' ? 'secondary' : 'white'}`}
            onClick={() => setSelected('btc')}
          >
            <Icon name="bitcoin" brandStyle="fab" />
          </button>
          <button
            className={`btn btn-${selected === 'eth' ? 'secondary' : 'white'}`}
            onClick={() => setSelected('eth')}
          >
            <Icon name="ethereum" brandStyle="fab" />
          </button>
          <button
            className={`btn btn-${selected === 'xrp' ? 'secondary' : 'white'}`}
            onClick={() => setSelected('xrp')}
          >
            <Icon name="times" />
          </button>
        </div>
        <div className="coin-name">
          <h2 className="text-primary">
            {selectedObj.name}
          </h2>
          <div className="last-updated">
            <small>Last updated</small>
            <span>{lastUpdate}</span>
          </div>
        </div>
        <div className="description">
          <small>
            Below is the value of the Bitcoin cryptocurrency from different web pages for comparison.
          </small>
        </div>
        <div className="prices">
          {selectedObj.prices && selectedObj.prices.map((price) => (
            <div key={price.service} className="card">
              <img src={getImage(price.service)} alt={price.service} />
              <div className="price">
                <span>{price.service}</span>
                <strong>{currencyFormat(price.value)}</strong>
              </div>
              <a href={price.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                <Icon name="external-link-alt" />
              </a>
            </div>
          ))}
        </div>
        <Forex prices={selectedObj.prices} />
      </div>
    </div>
  );
};

export default Dashboard;
