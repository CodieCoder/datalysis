import { Avatar, Box, Text, Container, Group, TextInput } from "@mantine/core";
import "../styles/gpt.scss";
import useTheme from "../../../hooks/useTheme";
import { FC, useState } from "react";
import { generateId } from "../../../utils/utils";
import runGPT from "../../../utils/runGptModel";

import dayjs from "dayjs";
import { IChat } from "../../../utils/types";
import useData from "../../../hooks/useData";
import { useSimpleToast } from "simple-tailwind-toast";

const DashboardGpt = () => {
  const [value, setValue] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<IChat[]>([]);

  const { theme } = useTheme();

  const { getCurrentData: currentData } = useData();

  const { toast } = useSimpleToast();

  const handleQA = async (
    prompt: string,
    callback: (isValid?: boolean) => void
  ) => {
    if (!prompt?.length || !currentData) {
      toast.add({
        content: {
          title: `I can't answer your question if there is ${
            !prompt?.length ? "none" : ""
          } ${!currentData ? "no data" : ""}!`,
          type: "warning",
        },
      });

      return;
    }

    setIsLoading(true);

    const answer = await runGPT({
      data: currentData.data,
      prompts: [...chats, { response: "", prompt, id: "", timestamp: "" }],
    });

    const chat = {
      id: generateId(),
      timestamp: dayjs().format("DD/MM/YYYY h:m A"),
      prompt,
      response: answer,
    };

    setChats((prev) => [...prev, chat]);

    callback(!!answer?.length);

    setIsLoading(false);
  };

  const onSend = (question: string, callback: (isValid?: boolean) => void) => {
    handleQA(question, callback);
  };

  return (
    <Box className="dashboardGpt">
      <Container
        className="chat"
        style={{
          border: `1px solid ${theme.borderColor}`,
          borderRadius: "8px",
        }}
      >
        {chats?.map((chat) => (
          <div>
            <EachMEssageBox
              text={chat.response}
              timestamp={chat.timestamp}
              isUser
            />
            <EachMEssageBox text={chat.prompt} isUser />
          </div>
        ))}
      </Container>
      <Container mt={"1rem"} p={0} fluid>
        <TextInput
          placeholder="Example: Explain the data in simple terms"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value?.length) {
              onSend(value, (isValid) => isValid && setValue(undefined));
            }
          }}
          style={{
            width: "100%",
          }}
          size="lg"
          enterKeyHint={"send"}
        />
      </Container>
    </Box>
  );
};

export default DashboardGpt;

interface IProps {
  isUser?: boolean;
  text?: string;
  timestamp?: string;
}

const EachMEssageBox: FC<IProps> = ({ isUser, text, timestamp }) => {
  return (
    <div>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
          alt="Jacob Warnhalter"
          radius="xl"
        />
        <div>
          <Text size="sm">Data</Text>
          <Text size="xs" c="dimmed">
            {timestamp ?? ""}
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {text}
      </Text>
    </div>
  );
};
