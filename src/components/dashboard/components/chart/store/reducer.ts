import { options } from "marked";
import { IChartAction, IChartStore } from "../utils/types";
import CHART_STORE_ACTIONS_ENUM from "./actions";

const chartReducer = (
  prevState: IChartStore,
  action: IChartAction
): IChartStore => {
  const state = { ...prevState };
  const newState = reducers[action.type];

  const result = newState(state, action.payload);
  return result;
};

const reducers = {
  [CHART_STORE_ACTIONS_ENUM.UPDATE_OPTIONS]: (
    state: IChartStore,
    payload: any
  ) => {
    return { ...state, options: { ...(state?.options || {}), ...payload } };
  },
};

export default chartReducer;
