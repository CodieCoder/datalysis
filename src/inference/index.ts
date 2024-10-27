import { HfInference } from "@huggingface/inference";
import ENV from "../config/env";
import { IOptions } from "../utils/types";
import { generateError } from "../utils/errorHandler";
import { GENERAL_ERRORS } from "../constants/common";

// const tmp:PipelineType  = "PIPELINE_DATA"

class InferenceClass {
  private instance: HfInference | null = null;

  constructor() {
    if (this.instance === null) {
      this.instance = new HfInference(ENV.HUGGING_FACE_API);
    }
  }

  private async useInference(options: IOptions) {
    if (!this.instance) {
      return;
    }

    if (options.model) {
      const model = "HuggingFaceH4/zephyr-7b-beta";
      //   const model = 'meta-llama/CodeLlama-7b-hf';
      try {
        // const output = await this.instance.textGeneration({
        //   ...options,
        //   model,
        // });
        const output = await this.instance.textGeneration({
          inputs: [options.messages[0].content],
          model,
        });

        return output.generated_text;
      } catch (error) {
        console.error(error);
        return;
      }
    } else {
      try {
        // const output = await this.instance.chatCompletion(options);
        const output = await this.instance.textGeneration({
          inputs: [options.messages[0].content],
          model: options.model,
        });
        // return output?.choices?.[0]?.message?.content
        //   ? output?.choices?.[0]?.message?.content
        //   : undefined;
        return output?.generated_text;
      } catch (error) {
        console.error(error);
        return;
      }
    }
  }

  public async useModel(options: IOptions) {
    const code = await this.useInference(options);
    if (code) {
      return code;
    } else {
      const msg = generateError(GENERAL_ERRORS.INFERENCE.GET_CODE);
      throw new Error(msg);
    }
  }
}

export default InferenceClass;
