/* eslint-disable react/jsx-props-no-spreading */
import { useDraggable, useDroppable } from '@dnd-kit/core';
import financialTypeInfo from '../../../../utils/financialTypeInfo';

import './styles.scss';

interface FinancialCategoryRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

export default function FinancialCategoryRow(props: FinancialCategoryRowProps) {
  const { 'data-row-key': id, draggable, className, record } = props;
  const { financialKey, financialNameKey } =
    financialTypeInfo[record.financialType || 'bank'];
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      financialTypeData: {
        id: record.id,
        [financialNameKey]: record[financialNameKey],
        [financialKey]: record[financialKey],
      },
      financialType: record.financialType,
    },
  });
  const { active } = useDraggable({ id });
  const { financialType } = active ? active.data.current : '';
  const sameFinancialType = financialType === record.financialType;

  return draggable ? (
    <tr
      {...props}
      ref={setNodeRef}
      className={
        isOver
          ? `${className} on-drop ${sameFinancialType ? 'allowed' : 'restrict'}`
          : className
      }
    />
  ) : (
    <tr {...props} />
  );
}
