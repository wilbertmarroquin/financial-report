import { Col, Layout, Row } from 'antd';
import { useContext, useEffect } from 'react';
import TransactionCard from './TransactionCard';
import {
  TransactionContext,
  TransactionDispatchContext,
  TransactionState,
} from '../../context/TransactionContext';

import './styles.scss';
import getTransactionInfo from '../../api/getTransactionInfo';
import currencyFormat from '../../../../utils/currencyFormat';

const { Sider } = Layout;

export default function TransactionSider() {
  const { collapse, currentCellData } =
    useContext<TransactionState>(TransactionContext);
  const dispatch = useContext(TransactionDispatchContext);
  const { id, date, financialType, title, rowData } = currentCellData;
  const [transactionData, refetch] = getTransactionInfo(
    financialType,
    id,
    date
  );
  const transactionSumValue = transactionData.reduce(
    (acc, transaction) => acc + transaction.value,
    0
  );

  useEffect(() => {
    refetch();
  }, [currentCellData, refetch]);

  return (
    <Sider collapsed={collapse} className="transaction-sider">
      <Row className="header">
        <Row className="title">
          <Col>{title}</Col>
          <Col
            className="close"
            onClick={() => {
              dispatch({ type: 'setCollapse', collapse: false });
            }}
          >
            close
          </Col>
        </Row>
        <Row className="count">
          <Col className="transaction">
            {transactionData.length} Transactions
          </Col>
          <Col className="date">{date}</Col>
        </Row>
      </Row>
      <Row className="month-info">
        <Col>{date}</Col>
        <Col>{currencyFormat(transactionSumValue)}</Col>
      </Row>
      {transactionData.map((transaction) => (
        <TransactionCard
          id={transaction.id}
          key={transaction.id}
          date={transaction.date}
          description={transaction.description}
          title={transaction.title}
          value={transaction.value}
          typeData={rowData}
        />
      ))}
    </Sider>
  );
}
