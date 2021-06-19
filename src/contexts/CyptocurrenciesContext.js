import React, {createContext} from 'react';

const CryptocurrenciesContext = createContext();

const CryptocurrenciesProvider = ({children}) => {
  const data = {};
  return (
    <CryptocurrenciesContext.Provider value={data}>
      {children}
    </CryptocurrenciesContext.Provider>
  );
};

export {CryptocurrenciesProvider};
export default CryptocurrenciesContext;
