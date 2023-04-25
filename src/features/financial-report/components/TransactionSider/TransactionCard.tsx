/* eslint-disable react/jsx-props-no-spreading */
import { useDraggable } from '@dnd-kit/core';
import { Col, Row } from 'antd';
import currencyFormat from '../../../../utils/currencyFormat';
import financialTypeInfo from '../../../../utils/financialTypeInfo';

interface TransactionCardProps {
  date: string;
  title: string;
  description: string;
  value: number;
  id: number;
  typeData: any;
}

export default function TransactionCard(props: TransactionCardProps) {
  const { date, title, description, value, id, typeData } = props;
  const { financialKey, financialNameKey } =
    financialTypeInfo[typeData.financialType];
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id,
      data: {
        transaction: {
          id,
          date,
          value,
          title,
          description,
        },
        typeData: {
          id: typeData.id,
          [financialNameKey]: typeData[financialNameKey],
          [financialKey]: typeData[financialKey],
        },
        financialType: typeData.financialType,
      },
    });

  const dragStyle: React.CSSProperties = {
    transform: isDragging
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : '',
    cursor: 'move',
    border: isDragging ? '1px solid black' : '',
    background: isDragging ? 'white' : '',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <Row
      className="transaction-card"
      ref={setNodeRef}
      style={dragStyle}
      {...attributes}
      {...listeners}
    >
      <Col>
        <div className="date">{date}</div>
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </Col>
      <Col>
        <div className="value">{currencyFormat(value)}</div>
      </Col>
    </Row>
  );
}
