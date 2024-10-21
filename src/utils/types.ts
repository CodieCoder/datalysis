import { Chart, Options } from "@ant-design/plots/es/interface";
import { CHART_TYPES } from "./constants";

export interface IUseInferenceOptions {
  model?: string;
  [x: string]: any;
}

export interface IChat {
  id: string;
  prompt: string;
  response?: string;
  timestamp: string;
}

export interface IOptionMessage {
  role: string;
  content: string;
}

export interface IOptions {
  model?: string;
  messages: IOptionMessage[];
  max_tokens: number;
}

export interface IJsScriptPayload {
  response: string;
  data?: string;
  ref?: any;
}

export interface IGptPromptPayload {
  response?: string;
  prompt: string;
}

export interface IGptPayload {
  data: Omit<IData, "id" | "charts">;
  prompts: IGptPromptPayload[];
}

export interface IChartApiPayload {
  data: string;
  label: string;
  chartType?: string;
}

export interface IChart {
  type: CHART_TYPES;
  config?: Record<string, any>;
  chatContext?: IChat[];
}

export interface IData {
  id?: string;
  data: string;
  label: string;
  description?: string;
  charts?: IChart[];
}

export interface ILoading {
  chart?: boolean;
  chat?: boolean;
}

export interface IStore {
  data: IData[];
  currentData?: string;
  chartCode?: IJsScriptPayload | null;
  loading: ILoading;
}

export interface IDispatch {
  type: string;
  payload?: any;
}

export interface IGlobalContext {
  store: IStore;
  dispatch: ({ type, payload }: IDispatch) => void;
}

export interface IChartTypePayload
  extends Pick<IData, "data" | "description" | "label"> {}

export type IChartTypesResponse = CHART_TYPES[];

export interface IChartProp {
  key: string;
  component: React.ReactNode;
}

export interface IChartPayload
  extends Pick<IData, "data" | "description" | "label"> {
  type: CHART_TYPES;
}

export type IChartConfig = Options & Chart;

export interface IAllChart {
  Component: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<any> & React.RefAttributes<Chart>
  >;
  type: CHART_TYPES;
  defaultConfig?: IChartConfig;
}

export type TChart = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<any> & React.RefAttributes<Chart>
>;

export type TAllChart = Record<CHART_TYPES, IAllChart>;

export interface IFullscreenHook {
  readonly ref: (element: any) => void;
  readonly toggle: () => Promise<void>;
  readonly fullscreen: boolean;
}
