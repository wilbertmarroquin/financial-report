const financialTypeInfo = {
  bank: {
    financialKey: 'balance',
    transactionRoute: 'bankTransaction',
    route: 'bank',
    financialTypeIdKey: 'bankId',
    financialNameKey: 'bankName',
  },
  income: {
    financialKey: 'values',
    transactionRoute: 'incomeTransaction',
    route: 'income',
    financialTypeIdKey: 'typeId',
    financialNameKey: 'type',
  },
  cost: {
    financialKey: 'values',
    transactionRoute: 'costGoodTransaction',
    route: 'costGood',
    financialTypeIdKey: 'typeId',
    financialNameKey: 'type',
  },
  expense: {
    financialKey: 'values',
    transactionRoute: 'expenseTransaction',
    route: 'expense',
    financialTypeIdKey: 'typeId',
    financialNameKey: 'type',
  },
};

export default financialTypeInfo;
