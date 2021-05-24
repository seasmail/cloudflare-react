import React from 'react';

export interface FormComponentProps {
  handleSubmit: (e: React.FormEvent) => any;
  input: string;
  setInput: (value: string) => any;
  onError: string;
  isEnable: () => boolean;
}
