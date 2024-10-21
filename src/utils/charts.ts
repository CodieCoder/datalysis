import { CHART_TYPES } from "./constants";
import {
  Area,
  Bar,
  Column,
  Histogram,
  Line,
  Pie,
  Scatter,
  Stock,
} from "@ant-design/plots";
import { IChartConfig, TAllChart } from "./types";

export const DEFAULT_CHART_CONFIG: IChartConfig = {
  color: "#f00",
  // sort: true,
  autoFit: true,
  colorField: "price",
  radius: 1,
};

export const allCharts: TAllChart = {
  [CHART_TYPES.bar]: {
    Component: Bar,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.bar,
  },
  [CHART_TYPES.column]: {
    Component: Column,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.column,
  },
  [CHART_TYPES.doughnut]: {
    Component: Pie,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.doughnut,
  },
  [CHART_TYPES.line]: {
    Component: Line,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.line,
  },
  [CHART_TYPES.pie]: {
    Component: Pie,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.pie,
  },
  [CHART_TYPES.scatter]: {
    Component: Scatter,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.scatter,
  },
  [CHART_TYPES.area]: {
    Component: Area,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.area,
  },
  [CHART_TYPES.bubble]: {
    Component: Scatter,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.bubble,
  },
  [CHART_TYPES.stock]: {
    Component: Stock,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.stock,
  },
  [CHART_TYPES.heatmap]: {
    Component: Scatter,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.heatmap,
  },
  [CHART_TYPES.watefall]: {
    Component: Scatter,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.watefall,
  },
  [CHART_TYPES.histogram]: {
    Component: Histogram,
    defaultConfig: { ...DEFAULT_CHART_CONFIG },
    type: CHART_TYPES.histogram,
  },
};

const getChart = (type: string) => {
  if (!type?.length) return;

  const chart = Object.values(allCharts).find((chart) =>
    type.toLowerCase().includes(chart.type.toLowerCase())
  );

  return chart;
};

const chartJs = {
  allCharts,
  getChart,
};

export default chartJs;
