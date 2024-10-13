import { IGptPayload } from './types';
import { runGroqGpt } from './runGroq';

const runGPT = async (payload: IGptPayload) => {
  if (!payload.prompts?.length || !payload?.data?.length) return;
  else {
    return await runGroqGpt(payload);
  }
};

export default runGPT;
