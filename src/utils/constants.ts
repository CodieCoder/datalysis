export const GENERAL_ERRORS = {
  DEFAULT: "An error occurred. Please try again.",
  INFERENCE: {
    GET_CODE:
      "Error communicating with the AI service. Please check your connection and try again",
  },
  GPT: {
    EMPTY_DATA: "Oops! Sorry no data to speak to!",
  },
};

export const GLOBAL_CONSTANTS = {
  CHART_ID: "myChartId1",
  LEADER_BOARD: "leaderBoard",
  MAX_DATA_LENGTH: 1500,
  JS_CODE_REGEX: /```(javascript|js)/g,
  CHART_TYPES_MAX: 6,
  CHART_TYPES_JSON_PAYLOAD_MAX: 3,
};

export enum ModelTypeEnum {
  text2textGeneration = "text2textGeneration",
}

export const PROMPTS = {
  PREFIX: {
    QA: "Answer this question with the data above: ",
  },
};

export enum FILE_TYPES {
  json = "json",
  csv = "csv",
}

export enum CHART_TYPES {
  line = "line",
  bar = "bar",
  column = "Column",
  pie = "pie",
  doughnut = "doughnut",
  scatter = "scatter",
}
