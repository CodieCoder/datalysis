import { Box, Container } from "@mantine/core";
import "../../styles/gpt.scss";
import useTheme from "../../../../hooks/useTheme";
import { useState } from "react";
import { IChat, IGptPayload } from "../../../../utils/types";
import EachMessageBox from "./EachMessage";
import useGpt from "../../../../hooks/useGpt";
import { useSimpleToast } from "simple-tailwind-toast";
import { generateId } from "../../../../utils/utils";
import dayjs from "dayjs";
import useData from "../../../../hooks/useData";
import TextField from "./TextField";

const DashboardGpt = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const { isPending, mutate: mutateGpt } = useGpt();
  const { toast } = useSimpleToast();
  const { getCurrentData: currentData } = useData();

  const { theme } = useTheme();

  const errorHandler = () => {
    toast.add({
      content: {
        title: `Opps!! An error occurred. Please try again`,
        type: "error",
      },
    });
  };

  const onSubmit = async (
    currentPrompt: string,
    callback: (isSuccess?: boolean) => void
  ) => {
    const { id, charts, ...restPayload } = currentData;

    const payload: IGptPayload = {
      data: restPayload,
      prompts: [...(chats ?? []), { response: "", prompt: currentPrompt }].map(
        ({ response, prompt }) => ({ response, prompt })
      ),
    };

    mutateGpt(payload, {
      onSuccess: (response) => {
        if (response.data?.length) {
          //success
          callback(!!response.data?.length);
          const chat = {
            id: generateId(),
            timestamp: dayjs().format("DD/MM/YYYY h:m A"),
            prompt: currentPrompt,
            response: response.data,
          };

          setChats((prev) => [...prev, chat]);
        } else {
          //failed
          errorHandler();
        }
      },
      onError: (error) => {
        console.error(error);
        errorHandler();
      },
    });
  };

  return (
    <Box className="dashboardGpt" pos={"relative"}>
      <Container
        className="chat"
        style={{
          border: `1px solid ${theme.borderColor}`,
          borderRadius: "8px",
        }}
      >
        {chats?.map((chat) => (
          <div key={chat.id}>
            <EachMessageBox text={chat.prompt} isUser />
            <EachMessageBox text={chat.response} timestamp={chat.timestamp} />
          </div>
        ))}
      </Container>
      <Container mt={"1rem"} p={0} fluid>
        <TextField onSubmit={onSubmit} isLoading={isPending} />
      </Container>
    </Box>
  );
};

export default DashboardGpt;
