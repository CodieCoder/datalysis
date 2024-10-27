import { Box, Container, Divider, Flex } from "@mantine/core";

interface IProps {
  isOpen?: boolean;
  toggle: (value?: boolean) => void;
}

const ChartToolMenuDrawer = ({ isOpen, toggle }: IProps) => {
  return (
    <Box
      style={{
        overflow: "hidden",
        position: "absolute",
        bottom: "0",
        top: "0",
        left: "0rem",
        color: "#ddd",
        height: "100%",
        zIndex: 1,
        backdropFilter: "blur(5px)",
        background: "rgba(10, 10, 10, 0.6)",
        width: "20rem",
        marginLeft: isOpen ? "0" : "-22rem",
        transition: "0.4s",
      }}
    >
      <Container>
        <Flex justify={"space-between"}>Chart tools menu</Flex>
        <Divider color={"gray"} />
        <Box>//body</Box>
      </Container>
    </Box>
  );
};

export default ChartToolMenuDrawer;
