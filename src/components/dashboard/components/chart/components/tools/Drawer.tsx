import { Box, Container, Divider, Fieldset, Flex } from "@mantine/core";
import ChartToolFields from "./components/Fields";
import ChartToolsSort from "./components/Sort";
import useTheme from "../../../../../../hooks/useTheme";

interface IProps {
  isOpen?: boolean;
  toggle: (value?: boolean) => void;
}

const ChartToolMenuDrawer = ({ isOpen, toggle }: IProps) => {
  const { isDark } = useTheme();

  return (
    <Box
      style={{
        overflow: "hidden",
        position: "absolute",
        bottom: "0",
        top: "0",
        left: "0rem",
        // color: "#ddd",
        height: "100%",
        zIndex: 1,
        backdropFilter: "blur(5px)",
        background: isDark
          ? "rgba(10, 10, 10, 0.5)"
          : "rgba(250, 250, 250, 0.1)",
        width: "20rem",
        marginLeft: isOpen ? "0" : "-22rem",
        transition: "0.4s",
        border: isDark ? "" : "1px solid #ddd",
      }}
    >
      <Box>
        <Box mt={"md"}>
          <ChartToolFields />
          <ChartToolsSort />
        </Box>
      </Box>
    </Box>
  );
};

export default ChartToolMenuDrawer;
