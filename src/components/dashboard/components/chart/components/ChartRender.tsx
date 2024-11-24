import { memo, useEffect, useMemo, useState } from "react";
import chartJs from "../../../../../utils/charts";
import { IChartConfig, IRecordArray } from "../../../../../utils/types";
import ChartBox from "./Chart";
import { isEmpty, sortBy } from "lodash";
import { useElementSize } from "@mantine/hooks";
import { Grid } from "@mantine/core";
import useTheme from "../../../../../hooks/useTheme";
import { useChartStore } from "../store";

interface IProps {
  type: string;
  config: IChartConfig;
  chartData: IRecordArray[];
  label: string;
  description: string | undefined;
  id: string | undefined;
}
const ChartRender = memo(({ type, config, chartData: data }: IProps) => {
  const [span, setSpan] = useState(6);
  const { ref, width, height } = useElementSize();
  const { isDark } = useTheme();
  const { store: chartStore } = useChartStore();

  const { Component, defaultConfig, chartData } = useMemo(() => {
    const result = chartJs.getChart(type);
    console.log("Testee chartData : ", config);
    const tmp: any = {
      Component: result?.Component || null,
      defaultConfig: {
        ...config,
        ...(result?.defaultConfig || {}),
        ...(chartStore?.options || {}),
      },
    };

    const _config: any = {
      ...(config || {}),
      ...(tmp?.defaultConfig || {}),
      ...(chartStore?.options || {}),
      data,
    };

    return { ...tmp, defaultConfig: _config };

    return { ...tmp, chartData: [] };
  }, [type, config, chartStore?.options]);

  useEffect(() => {
    console.log("Testee defaultConfig :  ", defaultConfig);
  }, [defaultConfig]);

  return Component && !isEmpty(defaultConfig) ? (
    <Grid.Col key={type} span={span}>
      <ChartBox
        updateSpan={setSpan}
        span={span}
        chart={
          <Component
            {...defaultConfig}
            data={data}
            width={width}
            height={height}
            theme={isDark ? "classicDark" : "academy"}
          />
        }
        title={type}
        chartRef={ref}
      />
    </Grid.Col>
  ) : null;
});

export default ChartRender;
