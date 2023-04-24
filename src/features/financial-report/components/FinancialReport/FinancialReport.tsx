import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';
import {
  bankMockData,
  costGoodsMockData,
  expenseMockData,
  incomeMockData,
} from './mockData';
import { getSumByMonth, mapChildrenValues } from '../utils';
import {
  BankData,
  CostGoodData,
  ExpenseData,
  IncomeData,
  SumByMonth,
} from '../../types';
import {
  TransactionAction,
  TransactionDispatchContext,
} from '../../context/TransactionContext';

import './styles.scss';

const getDataSource = (
  banksData: BankData[],
  expensesData: ExpenseData[],
  costGoodData: CostGoodData[],
  incomeData: IncomeData[]
) => {
  const bankChildren = mapChildrenValues(banksData, 'bankName', 'balance');
  const incomeChildren = mapChildrenValues(incomeData, 'type', 'values');
  const costGoodChildren = mapChildrenValues(costGoodData, 'type', 'values');
  const expensesChildren = mapChildrenValues(expensesData, 'type', 'values');
  const bankSum = getSumByMonth(banksData, 'balance');
  const incomeSum = getSumByMonth(incomeData, 'values');
  const costGoodSum = getSumByMonth(costGoodData, 'values');
  const expensesSum = getSumByMonth(expensesData, 'values');
  const grossProfit: SumByMonth = {};
  Object.keys(incomeSum).forEach((month) => {
    grossProfit[month] = incomeSum[month] - costGoodSum[month];
  });
  const netProfit: SumByMonth = {};
  Object.keys(expensesSum).forEach((month) => {
    netProfit[month] = grossProfit[month] + expensesSum[month];
  });

  return [
    {
      key: '1',
      sectionName: 'Banks',
      children: bankChildren,
      ...bankSum,
    },
    {
      key: '2',
      sectionName: 'Credit Cards',
    },
    {
      key: '3',
      sectionName: 'Available Starting Balance',
      isCalculated: true,
      ...bankSum,
    },
    {
      key: '4',
      sectionName: 'Income',
      children: incomeChildren,
      ...incomeSum,
    },
    {
      key: '5',
      sectionName: 'Cost of Goods Sold',
      children: costGoodChildren,
      ...costGoodSum,
    },
    {
      key: '6',
      sectionName: 'Gross Profit',
      isCalculated: true,
      ...grossProfit,
    },
    {
      key: '7',
      sectionName: 'Expense',
      children: expensesChildren,
      ...expensesSum,
    },
    {
      key: '8',
      sectionName: 'Net Income',
      isCalculated: true,
      ...netProfit,
    },
  ];
};

const getColumns = (
  transactionSiderAction: React.Dispatch<TransactionAction>
) => {
  const dates = [
    {
      title: 'Oct 2022',
      dataIndex: '10/2022',
    },
    {
      title: 'Nov 2022',
      dataIndex: '11/2022',
    },
    {
      title: 'Dec 2022',
      dataIndex: '12/2022',
    },
    {
      title: 'Jan 2022',
      dataIndex: '01/2023',
    },
    {
      title: 'Feb 2022',
      dataIndex: '02/2023',
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: <span className="main-table-header">Financial Report</span>,
      dataIndex: 'sectionName',
      key: 'sectionName',
      fixed: true,
      render: (sectionName, rowData) => {
        return sectionName || rowData.bankName || rowData.type;
      },
    },
  ];

  dates.forEach((date) => {
    const { title, dataIndex } = date;

    columns.push({
      title: (
        <div className="table-header">
          <p>Actual</p>
          <p className="date">{title}</p>
        </div>
      ),
      onCell: (record) => ({
        onClick: () => {
          if (!record.sectionName) {
            transactionSiderAction({ type: 'setData', data: record });
          }
        },
      }),
      dataIndex,
      render: (value) => {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        return formatter.format(value || 0);
      },
    });
  });

  return columns;
};

export default function FinancialReport(): JSX.Element {
  const dispatch = useContext(TransactionDispatchContext);

  return (
    <Table
      bordered
      dataSource={getDataSource(
        bankMockData.data,
        expenseMockData.data,
        costGoodsMockData.data,
        incomeMockData.data
      )}
      columns={getColumns(dispatch)}
      pagination={false}
      rowClassName={(record) => {
        return record.isCalculated ? 'calculated-row' : '';
      }}
      className="financial-report-table"
    />
  );
}
