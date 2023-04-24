/* eslint-disable react/jsx-props-no-spreading */
import { useDraggable } from '@dnd-kit/core';
import { Col, Row } from 'antd';

interface TransactionCardProps {
  date: string;
  title: string;
  description: string;
  value: number;
  id: number;
}

export default function TransactionCard(props: TransactionCardProps) {
  const { date, title, description, value, id } = props;
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id,
      data: {
        value: 'holas',
      },
    });

  const dragStyle: React.CSSProperties = {
    transform: isDragging
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : '',
    cursor: 'move',
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
        <div className="value">{value}</div>
      </Col>
    </Row>
  );
}
