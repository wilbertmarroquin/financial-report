import { Col, Layout, Row } from 'antd';
import { useContext } from 'react';
import TransactionCard from './TransactionCard';
import {
  TransactionContext,
  TransactionDispatchContext,
  TransactionState,
} from '../../context/TransactionContext';

import './styles.scss';

const { Sider } = Layout;

export default function TransactionSider() {
  const { collapse, currentCellData } =
    useContext<TransactionState>(TransactionContext);
  const dispatch = useContext(TransactionDispatchContext);

  return (
    <Sider collapsed={collapse} className="transaction-sider">
      <Row className="header">
        <Row className="title">
          <Col>Office Supplies & Software</Col>
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
          <Col className="transaction">3 Transactions</Col>
          <Col className="date">October 2023</Col>
        </Row>
      </Row>
      <Row className="month-info">
        <Col>Oct 2022</Col>
        <Col>12397</Col>
      </Row>
      <TransactionCard
        date="10/10/2002"
        description="Google Ads"
        title="Google"
        value={11234}
      />
      <TransactionCard
        date="10/10/2002"
        description="Google Ads"
        title="Google"
        value={11234}
      />
      <TransactionCard
        date="10/10/2002"
        description="Google Ads"
        title="Google"
        value={11234}
      />
    </Sider>
  );
}
