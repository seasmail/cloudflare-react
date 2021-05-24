import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Spinner from 'react-bootstrap/Spinner';

import Block from './block/Block';
import FormComponent from './form/Form';
import TransactionTable from './transaction-table/TransactionTable';

import './App.css';

const App = (): JSX.Element => {
  const [data, setData] = useState({
    number: '',
    hash: '',
    transactions: [],
  });
  const [input, setInput] = useState('');
  const [onError, setOnError] = useState('');
  const [isLoaded, setIsLoaded] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    handleIsLoadedToggle();

    fetch(`/api/block/${input}`)
      .then((res) => res.json())
      .then((data) => {
        data.result ? setResult(data) : setError(data);
        setInput('');

        handleIsLoadedToggle();
      })
  }

  const isEnable = (): boolean => {
    return !!input && ((+input > 0) || input.toLowerCase() === 'latest');
  }

  const setResult = (data: { result: React.SetStateAction<{ number: string; hash: string; transactions: never[]; }>; }) => {
    setData(data.result);
    setOnError('');
  }

  const setError = (data: { error: { message: React.SetStateAction<string>; }; }) => {
    data.error && setOnError(data.error.message);
    setData({
      number: '',
      hash: '',
      transactions: [],
    });
  }

  const handleIsLoadedToggle = () => {
    setIsLoaded(currentIsLoaded => !currentIsLoaded)
  };

  useEffect(() => {
    fetch("/api/block/latest")
      .then((res) => res.json())
      .then((data) => setData(data.result));
  }, []);

  return (
    <div className="App">
      <div className="content">
        <FormComponent
          handleSubmit={(e: React.FormEvent) => handleSubmit(e)}
          input={input}
          setInput={setInput}
          onError={onError}
          isEnable={isEnable}/>
        {!isLoaded && (
          <Spinner animation="border" role="status"/>
        )}
        {isLoaded && !onError && (
          <div className="block-info">
            <Block number={data.number} hash={data.hash} className="Block"/>
            <div>
              <h5>Recent Transactions</h5>
              {data.transactions && (
                <TransactionTable transactions={data.transactions.slice(0, 8)}/>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
