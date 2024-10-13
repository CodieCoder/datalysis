import { Container } from "@mantine/core";
import DesktopPane from "./DesktopPane";
import { useDisclosure } from "@mantine/hooks";
import DashboardGpt from "./Gpt";
import ChartContainer from "./chart";

const DashboardDesktop = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Container
      display={"flex"}
      style={{ height: "100%", gap: "1rem" }}
      p={0}
      fluid={true}
    >
      <DesktopPane size="large" isFullPage={opened}>
        <ChartContainer />
      </DesktopPane>
      <DesktopPane size={"small"}>
        <DashboardGpt />
      </DesktopPane>
    </Container>
  );
};

export default DashboardDesktop;
