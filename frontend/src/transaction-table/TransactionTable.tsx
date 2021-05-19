import React, { FunctionComponent } from 'react';

import Table from 'react-bootstrap/Table';

import { truncate } from '../utils';

import { TransactionProps } from './interface';
import './TransactionTable.css';

const TransactionTable: FunctionComponent<TransactionProps> = (
  { transactions }: TransactionProps
) => <div>
  {transactions.length ? (
    <Table striped bordered hover size="sm">
      <thead>
      <tr>
        <th>Hash</th>
        <th>From</th>
        <th>To</th>
      </tr>
      </thead>
      <tbody>
        {transactions.map((value, index) => {
          return <tr key={index}>
              <td>{value.hash && truncate(value.hash)}</td>
              <td>{value.from && truncate(value.from)}</td>
              <td>{value.to && truncate(value.to)}</td>
            </tr>
        })}
      </tbody>
    </Table>
  ) : <span>No transactions found</span>}
</div>

export default TransactionTable;
