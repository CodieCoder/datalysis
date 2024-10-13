import axios from "axios";
import { IChartApiPayload, IGptPayload } from "./types";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  // timeout: 100,
});

export const runGroqCode = async (
  data: IChartApiPayload
): Promise<string | undefined> => {
  try {
    const response = await instance.post("code", data);
    return response.data;
  } catch (error) {
    console.error("Error in runGroqCode:", error);
    return undefined;
  }
};

export const runGroqGpt = async (
  payload: IGptPayload
): Promise<string | undefined> => {
  try {
    const response = await instance.post("gpt", {
      ...payload,
      prompts: payload.prompts.map(({ response, prompt }) => ({
        response,
        prompt,
      })),
    });
    return response.data;
  } catch (error) {
    console.error("Error in runGroqCode:", error);
    return undefined;
  }
};

export const runGroqChartTypes = async (
  data: string
): Promise<string[] | undefined> => {
  try {
    const response = await instance.post("chart-types", { data });
    return response.data;
  } catch (error) {
    console.error("Error in runGroqChartTypes", error);
    return undefined;
  }
};
