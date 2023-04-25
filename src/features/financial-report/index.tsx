import { useEffect } from 'react';
import { Layout } from 'antd';
import { DndContext } from '@dnd-kit/core';
import FinancialReport from './components/FinancialReport/FinancialReport';
import TransactionSider from './components/TransactionSider/TransactionSider';
import TransactionContextContainer from './context/TransactionContext';
import apiInstance from '../../utils/axiosInstance';
import getFinancialTableInfo from './api/getFinancialTableInfo';
import financialTypeInfo from '../../utils/financialTypeInfo';

const { Content } = Layout;

const sendDataMockProcessByType = (
  financialTypeData,
  transaction,
  typeData,
  financialType,
  callback
) => {
  const { financialKey, transactionRoute, route, financialTypeIdKey } =
    financialTypeInfo[financialType];

  const dropBalance = {
    ...financialTypeData,
    [financialKey]: financialTypeData[financialKey].map((element) => {
      return {
        ...element,
        value:
          element.date === transaction.date
            ? element.value + transaction.value
            : element.value,
      };
    }),
  };

  const dragBalance = {
    ...typeData,
    [financialKey]: typeData[financialKey].map((element) => {
      return {
        ...element,
        value:
          element.date === transaction.date
            ? element.value - transaction.value
            : element.value,
      };
    }),
  };

  const changeTransaction = apiInstance.put(
    `/${transactionRoute}/${transaction.id}`,
    {
      ...transaction,
      [financialTypeIdKey]: financialTypeData.id,
    }
  );

  const changeCategoryIn = apiInstance.put(
    `/${route}/${financialTypeData.id}`,
    {
      ...dropBalance,
    }
  );

  const changeCategoryOut = apiInstance.put(`/${route}/${typeData.id}`, {
    ...dragBalance,
  });

  Promise.all([changeTransaction, changeCategoryIn, changeCategoryOut]).then(
    callback
  );
};

const handleDragEnd = async (event, fetch) => {
  const { active, over } = event;
  const { current: activeData } = active.data;
  const {
    transaction,
    typeData,
    financialType: activeFinancialType,
  } = activeData;
  const { current: overData } = over.data;
  const { financialTypeData, financialType } = overData;

  if (activeFinancialType === financialType) {
    sendDataMockProcessByType(
      financialTypeData,
      transaction,
      typeData,
      financialType,
      () => {
        setTimeout(() => {
          fetch();
        }, 500);
      }
    );
  } else {
    alert(
      'Category re-assign is only possible between transactions with same financial type'
    );
  }
};

export default function FinancialReportView() {
  const [financialData, fetch] = getFinancialTableInfo();
  useEffect(() => {
    fetch();
  }, []);

  return (
    <Layout>
      <TransactionContextContainer>
        <DndContext
          onDragEnd={(event) => {
            handleDragEnd(event, fetch);
          }}
        >
          <Layout>
            <Content>
              <FinancialReport data={financialData} />
            </Content>
          </Layout>
          <TransactionSider />
        </DndContext>
      </TransactionContextContainer>
    </Layout>
  );
}
