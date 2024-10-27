import { All_CHARTS } from "../constants/chart";

const getChart = (type: string) => {
  if (!type?.length) return;

  const chart = Object.values(All_CHARTS).find((chart) =>
    type.toLowerCase().includes(chart.type.toLowerCase())
  );

  return chart;
};

const chartJs = {
  allCharts: All_CHARTS,
  getChart,
};

export default chartJs;
