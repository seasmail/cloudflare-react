export interface Transaction {
  from: string;
  to: string;
  hash: string;
}

export interface TransactionProps {
  transactions: Transaction[];
}
