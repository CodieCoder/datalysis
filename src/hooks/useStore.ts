import { useContext, useMemo } from "react";
import { GlobalContext } from "../store/globalStore/Provider";

const useStore = () => {
  const { store, dispatch } = useContext(GlobalContext);

  return { store: useMemo(() => store, [store]), dispatch };
};

export default useStore;
