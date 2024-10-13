import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { IChartPayload } from "../utils/types";

const useGetChart = () => {
  const mutation = useMutation({
    mutationFn: (data: IChartPayload) => api.chart.getchart(data),
  });

  return mutation;
};

export default useGetChart;
