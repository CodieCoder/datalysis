import ChartControls from "./Controls";
import useTheme from "../../../../../hooks/useTheme";
import { Box, Drawer } from "@mantine/core";
import { useDisclosure, useFullscreen } from "@mantine/hooks";
import ChartToolsMenu from "./tools/BurgerButton";
import ChartToolMenuDrawer from "./tools/Drawer";

interface IProps {
  chart: React.ReactNode;
  title?: React.ReactNode;
  headerComponent?: React.ReactNode;
  controlsOptions?: {
    isMaximize?: boolean;
    isMinimize?: boolean;
    isShowSize?: boolean;
  };
  chartRef: React.Ref<any>;
  updateSpan: (span: number) => void;
  span: number;
}

const ChartBox = ({
  chart,
  title,
  headerComponent,
  chartRef,
  updateSpan,
  span,
}: IProps) => {
  const [opened, { toggle: toggleMenu }] = useDisclosure();
  const fullscreenHook = useFullscreen();
  const { isDark } = useTheme();

  return (
    <Box
      className="chartbox"
      style={{
        position: "relative",
        border: `1px solid ${isDark ? "#555" : "#ddd"}`,
        overflow: "hidden",
      }}
      p={0}
      ref={fullscreenHook?.ref}
      bg={isDark ? "dark" : "#fff"}
    >
      <div
        className="chartbox-header"
        style={{
          borderBottom: `1px solid ${isDark ? "#555" : "#ddd"}`,
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="chartbox-menu">
            <ChartToolsMenu toggle={toggleMenu} isOpen={opened} />
          </div>
          <div className="chartbox-title">{title}</div>
        </div>
        <div className="chartbox-others">{headerComponent}</div>
        <div className="chartbox-others">
          <ChartControls
            toggleFullscreen={fullscreenHook?.toggle}
            isFullscreen={fullscreenHook?.fullscreen}
            updateSpan={updateSpan}
            span={span}
          />
        </div>
      </div>
      <Box pos={"relative"} h={"100%"}>
        <ChartToolMenuDrawer toggle={toggleMenu} isOpen={opened} />
        <div className="chartbox-chart" ref={chartRef}>
          {chart}
        </div>
      </Box>
    </Box>
  );
};

export default ChartBox;
