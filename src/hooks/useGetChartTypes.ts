import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { IChartTypePayload } from "../utils/types";

const useGetChartTypes = () => {
  const mutation = useMutation({
    mutationFn: (data: IChartTypePayload) => api.chart.getchartTypes(data),
  });

  return mutation;
};

export default useGetChartTypes;
