import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import Icon from "../../Icon";

const ThemeSwitcher = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
      //   variant={"transparent"}
      color={""}
      aria-label="Theme switcher"
      //   size={"sm"}
    >
      <Icon
        icon={colorScheme === "dark" ? "Moon" : "Brightness"}
        size="small"
      />
    </ActionIcon>
  );
};

export default ThemeSwitcher;
