import { Box, Divider, Flex } from "@mantine/core";
import Icon from "../../../../../Icon";

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
        //   background: "rgba(120, 120, 120, 0.1)",
      }}
    >
      <div
        style={{
          background: "rgba(10, 10, 10, 0.6)",
          transition: "0.4s",
          width: "20rem",
          marginLeft: isOpen ? "0" : "-22rem",
          height: "100%",
          backdropFilter: "blur(5px)",
        }}
        //   px="0.5rem"
      >
        <Flex justify={"space-between"}>Chart tools menu</Flex>
        <Divider color={"gray"} />
        <Box>//body</Box>
      </div>
    </Box>
  );
};

export default ChartToolMenuDrawer;
