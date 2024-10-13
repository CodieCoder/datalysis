import { Select } from "@mantine/core";
import Icon from "../../../../Icon";
import { memo } from "react";

interface IProps {
  toggleFullscreen: () => Promise<void>;
  isFullscreen: boolean;
  updateSpan: (value: number) => void;
  span?: number;
}

const chartSize = [
  { label: "1", value: "6" },
  { label: "2", value: "8" },
  { label: "3", value: "10" },
  { label: "4", value: "12" },
];

const ChartControls = memo(
  ({ toggleFullscreen, isFullscreen, updateSpan, span }: IProps) => {
    return (
      <div className="ChartControls">
        <div className="chart-control-select">
          <Select
            size="xs"
            w={"4rem"}
            data={chartSize}
            value={String(span)}
            onChange={(value) => value && updateSpan(Number(value))}
          ></Select>
        </div>
        <div className="chart-control-each">
          <Icon icon={"Minimize"} size={"small"} />
        </div>
        <div className="chart-control-each" onClick={toggleFullscreen}>
          <Icon
            icon={isFullscreen ? "ExitFullscreen" : "Fullscreen"}
            size={"0.8rem"}
          />
        </div>
      </div>
    );
  }
);

export default ChartControls;
