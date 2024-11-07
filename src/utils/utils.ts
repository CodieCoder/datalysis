import { CHART_TYPES } from "../constants/chart";
import { FILE_TYPES } from "../constants/common";
import { IRecordArray } from "./types";

/**
 * @description This function converts a file to string
 * @param file File
 * @param callback (text:string|null) =>void
 *
 */
export const stringifyFile = (
  file: File,
  callback: (text?: string | null) => void
) => {
  if (file) {
    try {
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (e) => {
        callback(e?.target?.result?.toString());
      };
      callback(reader.result?.toString());
    } catch (error) {
      console.error(error);
      callback(null);
    }
  } else {
    callback(null);
  }
};

export const fileToString = (
  file: File
): Promise<string | undefined | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result?.toString());
    };

    reader.onerror = () => {
      reject("Error reading file");
    };

    reader.readAsText(file, "UTF-8");
  });
};

export const truncateText = (args: {
  max: number;
  text?: string;
  hideDots?: boolean;
}): string => {
  if (!args.text?.length) {
    return "";
  } else if (args.text.length < args.max) {
    return args.text;
  } else {
    return `${args.text.substring(0, args.max)}${args.hideDots ? "" : "..."}`;
  }
};

export const generateId = () => {
  return crypto.randomUUID().toString();
};

/**
 * @description: Applies all the necessary sanitization
 *  and structuring of the user data uploaded/paseted.
 * @param data string
 *
 * @returns An array of objects (IRecord)
 */

interface IOutput {
  isSuccess: boolean;
  msg?: string;
  data?: null;
}
export const cleanJsonData = (data: string) => {
  const output: IOutput = { isSuccess: false };

  try {
    const parsedData = JSON.parse(data) as IRecordArray;
    const stringData = JSON.stringify(parsedData);

    //remove unnecessary characters from Json data
    const cleanData = stringData.replace(/\n/g, "");

    //turn back again to an array
    const arrayData = JSON.parse(cleanData);
    output.data = arrayData;
  } catch (error) {
    output.msg = "Invalid data. Please check your data and try again.";
  }

  return output;
};

export const getDataSummary = (data: string) => {
  if (!data?.length) return data;
  else {
    const text = data.replace(/[^a-zA-Z0-9]/g, "");
    return truncateText({ max: 50, text });
  }
};

export const getFileType = (file: File) => {
  const type = file.type.split("/");
  if (type?.length) {
    const _type = type?.[1] || type[0];
    if (_type === "json" || _type === "ld+json") {
      return FILE_TYPES.json;
    } else {
      return FILE_TYPES.csv;
    }
  }
  return;
};

/**
 * @description A function to check if a string is valid JSON
 * @param data string - data to check if it is valid
 * @return boolean -  true if the data is a valid JSON data else false
 */
export const isValidJsonLength = (data?: IRecordArray[]) => {
  const stringData = JSON.stringify(data);
  if (
    stringData?.length &&
    stringData?.length > 9 &&
    stringData?.length <= 15000
  ) {
    //run JSON validity check
    return true;
  } else {
    return false;
  }
};

export const getChartTypeLabel = (type: CHART_TYPES) => {
  if (!type?.length) {
    return null;
  } else {
    const result = type.replace(/chart|plot/gi, "");
    return result;
  }
};

export const minifyJsonData = (data: IRecordArray[]) => {
  if (data?.length) {
    try {
      // const parsedData = JSON.parse(data) as Array<Object>;

      // Leave only 2 elements
      const minifiedData = data.slice(0, 2);

      return minifiedData;
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      return data;
    }
  }

  return data;
};

export function extractChartConfig2(text: string) {
  if (!text) {
    return null;
  }

  console.log("OK:  Code to process : ", text);

  try {
    const txt = JSON.stringify(text);
    // Use regex to find the chartConfig JavaScript object specifically
    const jsCodeMatch = txt.match(/const chartConfig = ({.*?});/s);

    if (!jsCodeMatch) {
      return null;
    }

    // Extract only the chartConfig object as a string
    const chartConfigStr = jsCodeMatch[1];

    // Parse the string as a JavaScript object
    const chartConfig = JSON.parse(chartConfigStr);

    return chartConfig;
  } catch (error) {
    console.error("Error parsing chartConfig object:", error);
    return null;
  }
}

export function extractChartConfig(text: string) {
  const regex = /const chartConfig = ({.*?});/s;
  const txt = JSON.stringify(text);
  const match = txt.match(regex);

  if (match?.length) {
    const json = match[1].trim().replace("const chartConfig = ", "");

    try {
      // Remove leading and trailing whitespace from the captured string
      const chartConfigStr = JSON.stringify(json);
      // Parse the string as a JavaScript object
      return JSON.parse(chartConfigStr);
    } catch (error) {
      console.error("Error parsing chartConfig object:", error);
      return null;
    }
  } else {
    console.warn("chartConfig object not found in the text.", text);
    return null;
  }
}
