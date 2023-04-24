import { Layout } from 'antd';
import FinancialReport from './components/FinancialReport/FinancialReport';
import TransactionSider from './components/TransactionSider/TransactionSider';
import TransactionContextContainer from './context/TransactionContext';

const { Content } = Layout;

export default function FinancialReportView() {
  return (
    <Layout>
      <TransactionContextContainer>
        <Layout>
          <Content>
            <FinancialReport />
          </Content>
        </Layout>
        <TransactionSider />
      </TransactionContextContainer>
    </Layout>
  );
}
