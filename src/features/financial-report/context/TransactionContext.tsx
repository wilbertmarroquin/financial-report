import { createContext, useReducer } from 'react';

export const TransactionContext = createContext({});
export const TransactionDispatchContext = createContext<
  React.Dispatch<TransactionAction>
>(() => {});

export interface TransactionState {
  collapse?: boolean;
  currentCellData?: object;
}

export interface TransactionAction {
  type: keyof typeof stateActions;
  data?: object;
  collapse?: boolean;
}

const initialState: TransactionState = {
  collapse: false,
  currentCellData: {},
};

const stateActions = {
  setData: (
    state: TransactionState,
    action: TransactionAction
  ): TransactionState => ({
    ...state,
    collapse: true,
    currentCellData: action.data,
  }),
  setCollapse: (
    state: TransactionState,
    action: TransactionAction
  ): TransactionState => ({
    ...state,
    collapse: action.collapse,
  }),
};

const stateReducer = (state: TransactionState, action: TransactionAction) => {
  return stateActions[action.type](state, action);
};

interface TransactionContextContainerProps {
  children: React.ReactNode;
}

export default function TransactionContextContainer(
  props: TransactionContextContainerProps
) {
  const { children } = props;
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <TransactionContext.Provider value={state}>
      <TransactionDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionDispatchContext.Provider>
    </TransactionContext.Provider>
  );
}
