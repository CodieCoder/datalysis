import {
  Box,
  Container,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { FC, useMemo } from "react";
import useTheme from "../../../hooks/useTheme";

interface IProps {
  isFullPage?: boolean;
  toggleFullPage?: (status?: boolean) => void;
  size: "small" | "default" | "large";
  children: React.ReactNode;
}

const DesktopPane: FC<IProps> = ({
  isFullPage,
  toggleFullPage,
  size,
  children,
}) => {
  const { theme } = useTheme();

  const getSize = useMemo(() => {
    return size === "small" ? "25%" : size === "large" ? "75%" : "50%";
  }, [size]);

  return (
    <Box
      style={{
        width: getSize,
        border: `1px solid ${theme.borderColor}`,
        borderRadius: "8px",
      }}
      p={"xs"}
    >
      {children}
    </Box>
  );
};

export default DesktopPane;
