import React, { FunctionComponent } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { FormComponentProps } from './interface';

const FormComponent: FunctionComponent<FormComponentProps> = (
  { handleSubmit, input, setInput, onError, isEnable }: FormComponentProps
) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBlock">
        <Form.Label>Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter block number"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        {onError && (
          <Alert variant="danger">{onError}</Alert>
        )}
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={!isEnable()}
      >
        Submit
      </Button>
    </Form>
  )
}

export default FormComponent;
