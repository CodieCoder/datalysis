import axiosInstance from "./axios";
import {
  IChartPayload,
  IChartTypePayload,
  IChartTypesResponse,
} from "../utils/types";

const chart = "code";
const types = "chart-types";

export const getchartTypes = (data: IChartTypePayload) => {
  return axiosInstance.post<IChartTypesResponse>(`${types}`, data);
};

export const getchart = (data: IChartPayload) => {
  return axiosInstance.post<string>(`${chart}`, data);
};
