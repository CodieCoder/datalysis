import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { IGptPayload } from "../utils/types";

const useGpt = () => {
  const mutation = useMutation({
    mutationFn: (data: IGptPayload) => api.gpt.getchart(data),
  });

  return mutation;
};

export default useGpt;
