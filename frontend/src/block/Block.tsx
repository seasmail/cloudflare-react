import React, { FunctionComponent } from 'react';

import Card from 'react-bootstrap/Card';

import { truncate } from '../utils';

import { BlockProps } from './interface';
import './Block.css';

export const Block: FunctionComponent<BlockProps> = ({ number, hash, className= '' }) => <div>
  {(number && hash) ? <Card style={{width: '20rem'}} className={className}>
    <Card.Title>Block {+number}</Card.Title>
    <Card.Body className="info">
      <div>
        <span className="bold">Number:</span> {+number};
      </div>
      <div>
        <span className="bold">Hash:</span> {truncate(hash)};
      </div>
    </Card.Body>
  </Card> : <span>No correct info about block</span>}
</div>
