import CHART_STORE_ACTIONS_ENUM from "../store/actions";

export interface IChartStoreOptions {
  xField?: string | undefined;
  yField?: string | undefined;
  [x: string]: string | undefined;
}

export interface IChartStore {
  isFullscreen?: boolean;
  options?: IChartStoreOptions;
}

export interface IChartContext {
  id: string;
  store: IChartStore;
  dispatch: React.Dispatch<IChartAction>;
}

export interface IChartAction {
  type: CHART_STORE_ACTIONS_ENUM;
  payload?: any;
}
