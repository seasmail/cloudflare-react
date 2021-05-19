export interface FormComponentProps {
  handleSubmit: () => any;
  input: string;
  setInput: (value: string) => any;
  onError: string;
  isEnable: () => boolean;
}
