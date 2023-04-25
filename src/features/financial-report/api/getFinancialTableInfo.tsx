/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback } from 'react';
import apiInstance from '../../../utils/axiosInstance';
import { FinancialType } from '../types';

const addFinancialTypeData = (data, financialType: FinancialType) => {
  return data.map((dataElement) => ({
    ...dataElement,
    financialType,
  }));
};

const getAllData = async () => {
  const bankBalance = apiInstance
    .get('/bank/balance')
    .then((response) => response.data);
  const incomeBalance = apiInstance
    .get('/income/balance')
    .then((response) => response.data);
  const costBalance = apiInstance
    .get('/cost/balance')
    .then((response) => response.data);
  const expenseBalance = apiInstance
    .get('/expense/balance')
    .then((response) => response.data);

  const data = await Promise.all([
    bankBalance,
    incomeBalance,
    costBalance,
    expenseBalance,
  ]).then((response) => {
    return {
      bankData: addFinancialTypeData(response[0], 'bank'),
      incomeData: addFinancialTypeData(response[1], 'income'),
      costGoodsData: addFinancialTypeData(response[2], 'cost'),
      expenseData: addFinancialTypeData(response[3], 'expense'),
    };
  });

  return data;
};

export default function getFinancialTableInfo() {
  const [data, setData] = useState({
    bankData: [],
    incomeData: [],
    costGoodsData: [],
    expenseData: [],
  });

  const fetch = useCallback(async () => {
    const allData = await getAllData();
    setData(allData);
  }, []);

  return [data, fetch];
}
