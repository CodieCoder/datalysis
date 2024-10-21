import { IGptPayload } from "../utils/types";
import axiosInstance from "./axios";

const url = "gpt";

export const getchart = (payload: IGptPayload) => {
  return axiosInstance.post<string | undefined>(`${url}`, payload);
};
