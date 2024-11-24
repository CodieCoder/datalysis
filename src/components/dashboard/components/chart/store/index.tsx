import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import chartReducer from "./reducer";
import { CHART_STORE_INIT } from "../utils/constants";
import { IChartAction, IChartContext, IChartStore } from "../utils/types";

const Context = createContext<IChartContext>({
  id: "",
  store: CHART_STORE_INIT,
  dispatch: () => {},
});

interface IProps {
  id: string;
  children: ReactNode;
}

const ChartStoreProvider = ({ id, children }: IProps) => {
  const [store, dispatch] = useReducer<
    (state: IChartStore, action: IChartAction) => IChartStore,
    IChartStore
  >(chartReducer, CHART_STORE_INIT, (value) => value);

  const _store = useMemo(() => {
    return store;
  }, [store]);

  //   const _dispatch = useCallback(dispatch, [store]);

  return (
    <Context.Provider value={{ id, store: _store, dispatch: dispatch }}>
      {children}
    </Context.Provider>
  );
};

export const useChartStore = () => {
  const { id, store, dispatch } = useContext(Context);

  //   const store = useMemo(() => {
  //     return _store;
  //   }, [_id, _store]);
  //   const id = useMemo(() => _id, [_store]);
  //   const dispatch = useCallback(_dispatch, [store]);

  // useEffect(() => {
  //   console.log("Testee store : ", store);
  // }, [store]);

  return { id, store, dispatch };
};

export default ChartStoreProvider;
