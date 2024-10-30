import { memo, useEffect, useMemo, useState } from "react";
import chartJs from "../../../../../utils/charts";
import { IChartConfig } from "../../../../../utils/types";
import ChartBox from "./Chart";
import { isEmpty, sortBy } from "lodash";
import { useElementSize } from "@mantine/hooks";
import { Grid } from "@mantine/core";
import useTheme from "../../../../../hooks/useTheme";
import { useChartStore } from "../store";

interface IProps {
  type: string;
  config: IChartConfig;
}
const ChartRender = memo(({ type, config }: IProps) => {
  const [span, setSpan] = useState(6);
  const { ref, width, height } = useElementSize();
  const { isDark } = useTheme();
  const { store: chartStore } = useChartStore();

  const { Component, defaultConfig, chartData } = useMemo(() => {
    const result = chartJs.getChart(type);

    const tmp: any = {
      Component: result?.Component || null,
      defaultConfig: {
        ...config,
        ...(result?.defaultConfig || {}),
        ...(chartStore?.options || {}),
      },
    };

    try {
      const dataArray = JSON.parse(tmp?.defaultConfig?.data);

      let test: any[] = dataArray?.map((data: any) => data);

      test = test.sort();
      // test = sortBy(test);

      const config: any = {
        data: test,
        ...(tmp?.defaultConfig || {}),
      };

      return { ...tmp, defaultConfig: config, chartData: test };
    } catch (error) {
      console.error("Error parsing string to JSON : ", error);
    }

    return { ...tmp, chartData: [] };
  }, [type, config, chartStore?.options]);

  useEffect(() => {
    console.log("Testee chartStore?.options :  ", chartStore?.options);
  }, [chartStore?.options]);

  return Component && !isEmpty(defaultConfig) ? (
    <Grid.Col key={type} span={span}>
      <ChartBox
        updateSpan={setSpan}
        span={span}
        chart={
          <Component
            {...defaultConfig}
            data={chartData}
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
