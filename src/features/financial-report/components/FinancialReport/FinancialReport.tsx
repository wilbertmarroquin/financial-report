import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useContext, useEffect } from 'react';
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
import FinancialCategoryRow from '../FinancialCategoryRow/FinancialCategoryRow';
import currencyFormat from '../../../../utils/currencyFormat';

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
    grossProfit[month] = incomeSum[month] + costGoodSum[month];
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
      children: [],
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
      key: 'key',
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
      onCell: (record) => {
        const { isCalculated, children } = record;
        return {
          draggable: true,
          onClick: () => {
            if (!children && !isCalculated) {
              transactionSiderAction({
                type: 'setData',
                data: {
                  date: dataIndex,
                  id: record.id,
                  value: record[dataIndex],
                  title: record.bankName || record.type,
                  financialType: record.financialType,
                  rowData: { ...record },
                },
              });
            }
          },
        };
      },
      dataIndex,
      render: (value) => {
        return currencyFormat(value);
      },
    });
  });

  return columns;
};

interface FinancialReportProps {
  data: {
    bankData: any;
    expenseData: any;
    costGoodsData: any;
    incomeData: any;
  };
}

export default function FinancialReport(
  props: FinancialReportProps
): JSX.Element {
  const dispatch = useContext(TransactionDispatchContext);
  const { data } = props;
  const { bankData, incomeData, expenseData, costGoodsData } = data;

  useEffect(() => {
    dispatch({ type: 'forceUpdateDataObject' });
  }, [data, dispatch]);

  return (
    <Table
      components={{
        body: {
          row: FinancialCategoryRow,
        },
      }}
      onRow={(record) => {
        const { isCalculated, children } = record;

        return {
          draggable: !children && !isCalculated,
          record,
        };
      }}
      bordered
      dataSource={getDataSource(
        bankData,
        expenseData,
        costGoodsData,
        incomeData
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
