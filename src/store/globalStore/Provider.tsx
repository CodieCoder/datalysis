import { createContext, FC, memo, useCallback, useMemo, useState } from "react";
import { SimpleToastProvider } from "simple-tailwind-toast";
import {
  IDispatch,
  IGlobalContext,
  IJsScriptPayload,
  IStore,
} from "../../utils/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IProps {
  children: React.ReactNode;
}

export const GlobalActions = {
  addData: "addData",
  updateData: "updateData",
  updateCurrentData: "updateCurrentData",
  removeData: "removeData",
  updateLoading: "updateLoading",
} as const;

const reducer = (state: IStore, { type, payload }: IDispatch): IStore => {
  let result = { ...state };
  let tmp: any;

  switch (type) {
    case GlobalActions.addData:
      result = {
        ...result,
        data: [payload, ...(result?.data || [])],
        currentData: payload.id,
      };
      break;
    case GlobalActions.updateData:
      tmp = [];

      result?.data?.forEach((each) => {
        if (each.id === payload?.id) {
          const tryn = {
            ...each,
            ...payload,
          };
          console.log("Teste updating data each : ", each);
          tmp.push(tryn);
        } else {
          tmp.push(each);
        }
      });

      console.log("Teste updating data payload : ", tmp);

      result = {
        ...result,
        data: tmp,
      };

      break;
    case GlobalActions.updateCurrentData:
      result = { ...result, currentData: payload };
      break;
    case GlobalActions.removeData:
      result = {
        ...result,
        ...payload,
      };
      break;
    case GlobalActions.updateLoading:
      result = { ...result, loading: payload };
      break;
    default:
      break;
  }

  return result;
};

const globalStoreInit: IStore = {
  data: [],
  loading: { chart: false, chat: false },
  chartCode: null,
};

export const GlobalContext = createContext<IGlobalContext>({
  store: globalStoreInit,
  dispatch: () => {},
});

const queryClient = new QueryClient();

const GlobalProvider: FC<IProps> = memo(({ children }) => {
  const [store, setStore] = useState<IStore>(globalStoreInit);

  const dispatch = useCallback(
    (payload: IDispatch) => setStore((store) => reducer(store, payload)),
    [store]
  );

  const values: IGlobalContext = useMemo(() => {
    return {
      store,
      dispatch,
    };
  }, [store]);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider value={values}>
        <SimpleToastProvider>{children}</SimpleToastProvider>
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
});

export default GlobalProvider;
