import { marked } from "marked";
import { GLOBAL_CONSTANTS } from "./constants";

const generateChartCode = (text: string) => {
  if (text && text.length > 30) {
    if (GLOBAL_CONSTANTS.JS_CODE_REGEX.test(text)) {
      // text = getJavascriptCode(text, idReplace);
      const markCode = extractCodeWithMark(text);
      text = markCode?.[markCode?.length - 1] ?? markCode?.[0];
    }

    if (text?.length) {
      const markCode2 = extractCodeWithMark(text);
      text = markCode2?.[markCode2?.length - 1] ?? markCode2?.[0];
    }
    return text;
  } else {
    console.log("Testee NO CODE: ");
    return;
  }
};

export const extractCodeWithMark = (markdown: string): string[] => {
  try {
    const tokens = marked.lexer(markdown);
    return tokens
      .filter((token) => token.type === "code")
      .map((token) => (token as any).text);
  } catch (error) {
    return [];
  }
};

export default generateChartCode;
