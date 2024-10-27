import { CHART_TYPES } from "../constants/chart";
import { FILE_TYPES } from "../constants/common";

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

export const cleanJsonData = (data: string) => {
  const parsedData = JSON.parse(data) as Array<Object>;
  const result = JSON.stringify(parsedData);

  //remove unnecessary characters from Json data
  return result.replace(/\n/g, "");
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
export const isValidJsonLength = (data?: string) => {
  if (data?.length && data?.length > 9 && data?.length <= 15000) {
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

export const minifyJsonData = (data: string) => {
  if (data?.length) {
    try {
      const parsedData = JSON.parse(data) as Array<Object>;

      // Leave only 2 elements
      const minifiedData = parsedData.slice(0, 2);

      return JSON.stringify(minifiedData);
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

  console.log("Testee code to process : ", text);

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
