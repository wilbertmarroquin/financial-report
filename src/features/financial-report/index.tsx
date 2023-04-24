import { Layout } from 'antd';
import { DndContext } from '@dnd-kit/core';
import FinancialReport from './components/FinancialReport/FinancialReport';
import TransactionSider from './components/TransactionSider/TransactionSider';
import TransactionContextContainer from './context/TransactionContext';

const { Content } = Layout;

const handleDragEnd = (event) => {
  console.log(event);
};

export default function FinancialReportView() {
  return (
    <Layout>
      <TransactionContextContainer>
        <DndContext onDragEnd={handleDragEnd}>
          <Layout>
            <Content>
              <FinancialReport />
            </Content>
          </Layout>
          <TransactionSider />
        </DndContext>
      </TransactionContextContainer>
    </Layout>
  );
}
