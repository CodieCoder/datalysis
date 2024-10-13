import { AppShell, Box, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "../Logo";
import DashboardDataDrawer from "./components/data";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Icon from "../Icon";
import DashboardDesktop from "./components/Desktop";
import Btn from "../common/Button";
import useStore from "../../hooks/useStore";
import { useEffect } from "react";
import useTheme from "../../hooks/useTheme";

export const Dashboard = () => {
  const [opened, { toggle }] = useDisclosure();
  const store = useStore()?.store;
  const { isDark } = useTheme();

  return (
    <Box h={"100%"}>
      <AppShell header={{ height: 40 }} footer={{ height: 40 }} padding="md">
        <AppShell.Header>
          <Group h="100%" px="md" justify={"space-between"} align="center">
            <Btn
              onClick={toggle}
              leftSection={<Icon icon={"AddFile"} size="small" />}
              size={"xs"}
            >
              Add data
            </Btn>
            <Logo />
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeSwitcher />
            </Box>
          </Group>
        </AppShell.Header>

        <AppShell.Main h={"100%"} pl={"xs"} pr={"xs"}>
          <div
            style={{
              height: "87vh",
            }}
          >
            <DashboardDesktop />
          </div>
        </AppShell.Main>

        <AppShell.Footer p="md">Footer</AppShell.Footer>
      </AppShell>
      <DashboardDataDrawer isOpen={opened} onClose={toggle} />
    </Box>
  );
};
