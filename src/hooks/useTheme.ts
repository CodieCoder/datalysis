import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useMemo } from "react";

const useTheme = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const values = useMemo(() => {
    const isDark = colorScheme === "dark";
    return {
      isDark,
      theme: {
        borderColor: isDark ? theme.colors.dark[5] : theme.colors.gray[4],
      },
    };
  }, [colorScheme, theme]);

  return values;
};

export default useTheme;
