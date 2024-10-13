import { useEffect, useMemo } from "react";
import { GlobalActions } from "../store/globalStore/Provider";
import {
  cleanJsonData,
  generateId,
  getDataSummary,
  truncateText,
} from "../utils/utils";
import useStore from "./useStore";
import { CHART_TYPES, GLOBAL_CONSTANTS } from "../utils/constants";
import { useSimpleToast } from "simple-tailwind-toast";
import { IData } from "../utils/types";

const useData = () => {
  const { dispatch, store } = useStore();
  const { toast } = useSimpleToast();

  const updateLoading = (type: "chart" | "chat", newState: boolean) => {
    const update = { ...store.loading, [type]: newState };

    dispatch({ type: GlobalActions.updateLoading, payload: update });
  };

  const addData = (data: IData) => {
    const id = generateId();
    const content = cleanJsonData(data.data);
    if (content.length > GLOBAL_CONSTANTS.MAX_DATA_LENGTH) {
      toast.add({
        content: {
          title: `Data too long. Maximum character length is ${GLOBAL_CONSTANTS.MAX_DATA_LENGTH}.`,
          type: "warning",
        },
      });

      return;
    }
    const payload: IData = {
      id,
      ...data,
      data: content,
    };

    dispatch({ type: GlobalActions.addData, payload });

    //get summary
    // updateData(data).then((summary) =>
    //   dispatch({ type: GlobalActions.updateData, payload: { id, summary } })
    // );
  };

  //TODO:
  //fetch a summary of the data from ai model
  const updateData = async (id: string, data: IData) => {
    const chart = store?.data.find((each) => each.id === id);
    if (chart) {
      const payload: IData = {
        ...chart,
        ...data,
        id,
      };

      dispatch({ type: GlobalActions.updateData, payload });
    }
  };

  const removeData = (id?: string) => {
    if (!id?.length || !store?.data?.length) {
      return;
    } else {
      const thisData = store.data?.findIndex((data) => data.id === id);
      if (thisData >= 0) {
        const replaceIndex = thisData === 0 ? 0 : thisData - 1;

        const payload = {
          currentData: store.data[replaceIndex],
          data: store.data.filter(
            (data) => data.id !== store.data[thisData].id
          ),
        };
        dispatch({ type: GlobalActions.removeData, payload });
      }
    }
  };

  const updateCurrentData = (id: string) => {
    dispatch({ type: GlobalActions.updateCurrentData, payload: id });
  };

  const getCurrentData = useMemo(() => {
    return (
      store?.data?.find((each) => each.id === store?.currentData) ||
      store?.data?.[0]
    );
  }, [store?.currentData]);

  return {
    addData,
    getCurrentData,
    removeData,
    updateCurrentData,
    updateData,
    store,
  };
};

export default useData;
