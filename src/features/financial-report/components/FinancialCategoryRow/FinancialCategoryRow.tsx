/* eslint-disable react/jsx-props-no-spreading */
import { useDraggable, useDroppable } from '@dnd-kit/core';

import './styles.scss';

interface FinancialCategoryRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

export default function FinancialCategoryRow(props: FinancialCategoryRowProps) {
  const { 'data-row-key': id, draggable, className } = props;
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      value: 'dolas',
    },
  });

  return draggable ? (
    <tr
      {...props}
      ref={setNodeRef}
      className={isOver ? `${className} on-drop` : className}
    />
  ) : (
    <tr {...props} />
  );
}
