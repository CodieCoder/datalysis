import ChartControls from "./Controls";
import useTheme from "../../../../../hooks/useTheme";
import { Box } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";

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
  const fullscreenHook = useFullscreen();
  const { isDark } = useTheme();

  return (
    <Box
      className="chartbox"
      style={{
        border: `1px solid ${isDark ? "#555" : "#ddd"}`,
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
        <div className="chartbox-title">{title}</div>
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
      <div className="chartbox-chart" ref={chartRef}>
        {chart}
      </div>
    </Box>
  );
};

export default ChartBox;
