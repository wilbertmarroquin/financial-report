export type BankData = {
  bankName?: string;
  balance?: {
    date: string;
    value: number;
  }[];
};

export type CommonData = BankData & {
  type?: string;
  values?: {
    date: string;
    value: number;
  }[];
};

export type SumByMonth = {
  [key: string]: number;
};

export type IterableCommonDataKeys = 'values' | 'balance';

export type CostGoodData = CommonData;

export type ExpenseData = CostGoodData;

export type IncomeData = CostGoodData;
