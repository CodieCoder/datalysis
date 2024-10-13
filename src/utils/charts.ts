import { CHART_TYPES } from "./constants";
import { Bar, Column, Line, Pie, Scatter } from "@ant-design/plots";
import { TAllChart } from "./types";

export const DEFAULT_CHART_CONFIG = {
  sort: true,
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
