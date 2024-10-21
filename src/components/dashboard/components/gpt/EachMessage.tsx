import { Avatar, Box, Group, Paper, Text } from "@mantine/core";
import Icon from "../../../Icon";

interface IProps {
  isUser?: boolean;
  text?: string;
  timestamp?: string;
}

const EachMessageBox = ({ isUser, text, timestamp }: IProps) => {
  return (
    <Box style={{ float: isUser ? "right" : "left", marginTop: "1rem" }}>
      <Paper withBorder radius="lg" p={"sm"}>
        <Group>
          <Avatar radius="xl" color="blue">
            <Icon icon={isUser ? "User" : "Brain"} />
          </Avatar>
          <div>
            <Text size="sm" variant="gradient">
              {isUser ? "You" : "Your data"}
            </Text>
            <Text size="xs" c="dimmed">
              {timestamp ?? ""}
            </Text>
          </div>
        </Group>
        <Text pl={4} pt="sm" size="sm">
          {text}
        </Text>
      </Paper>
    </Box>
  );
};

export default EachMessageBox;
