import { Col, Row } from 'antd';

interface TransactionCardProps {
  date: string;
  title: string;
  description: string;
  value: number;
}

export default function TransactionCard(props: TransactionCardProps) {
  const { date, title, description, value } = props;

  return (
    <Row className="transaction-card">
      <Col>
        <div className="date">{date}</div>
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </Col>
      <Col>
        <div className="value">{value}</div>
      </Col>
    </Row>
  );
}
