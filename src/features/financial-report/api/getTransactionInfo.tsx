/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback } from 'react';
import apiInstance from '../../../utils/axiosInstance';
import { FinancialType } from '../types';

const getData = {
  bank: (id: number, date: string) => {
    return apiInstance
      .get('/bank/transaction', {
        params: { date, bankId: id },
      })
      .then((response) => {
        return response.data;
      });
  },
  income: (id: number, date: string) => {
    return apiInstance
      .get('/income/transaction', {
        params: { date, typeId: id },
      })
      .then((response) => {
        return response.data;
      });
  },
  expense: (id: number, date: string) => {
    return apiInstance
      .get('/expense/transaction', {
        params: { date, typeId: id },
      })
      .then((response) => {
        return response.data;
      });
  },
  cost: (id: number, date: string) => {
    return apiInstance
      .get('/cost/transaction', {
        params: { date, typeId: id },
      })
      .then((response) => {
        return response.data;
      });
  },
};

export default function getTransactionInfo(
  financialType?: FinancialType,
  id?: number,
  date?: string
) {
  const [data, setData] = useState([]);
  const fetch = useCallback(async () => {
    if (id && financialType && date) {
      const allData = await getData[financialType](id, date);
      setData(allData);
    }
  }, [id, financialType, date]);

  return [data, fetch];
}
