import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { Block } from './block/Block';
import { TransactionTable } from './transaction-table/TransactionTable';

import './App.css';

function App(): JSX.Element {
  const [data, setData] = React.useState({
    number: '',
    hash: '',
    transactions: [],
  });
  const [input, setInput] = React.useState('');
  const [onError, setOnError] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(true);

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
    return !!input && (+input > 0);
  }

  const setResult = (data: any) => {
    setData(data.result);
    setOnError('');
  }

  const setError = (data: any) => {
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

  React.useEffect(() => {
    fetch("/api/block/latest")
      .then((res) => res.json())
      .then((data) => setData(data.result));
  }, []);
  return (
    <div className="App">
      <div className="content">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBlock">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter block number"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            {onError && <Alert variant="danger">{onError}</Alert>}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={!isEnable()}
          >
            Submit
          </Button>
        </Form>
        {!isLoaded && <Spinner animation="border" role="status">
        </Spinner>}
        {isLoaded && !onError && <div className="block-info">
          <Block number={data.number} hash={data.hash} className="Block"/>
          <div>
            <h5>Recent Transactions</h5>
            {data.transactions && <TransactionTable transactions={data.transactions}/>}
          </div>
        </div>}
      </div>
    </div>
  );
}

export default App;
