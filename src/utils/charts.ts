import { All_CHARTS } from "../constants/chart";

const getChart = (type: string) => {
  if (!type?.length) return;

  const chart = Object.values(All_CHARTS).find((chart) =>
    type.toLowerCase().includes(chart.type.toLowerCase())
  );

  return chart;
};

const dataToArray = (data: string) => {
  const dataArray = JSON.parse(data) as Array<Object>;
  return dataArray;
};

const chartJs = {
  allCharts: All_CHARTS,
  getChart,
  dataToArray,
};

export default chartJs;
