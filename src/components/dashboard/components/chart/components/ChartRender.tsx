import { memo, useEffect, useMemo, useState } from "react";
import chartJs from "../../../../../utils/charts";
import { IChartConfig } from "../../../../../utils/types";
import ChartBox from "./Chart";
import { isEmpty, sortBy } from "lodash";
import { useElementSize } from "@mantine/hooks";
import { Grid } from "@mantine/core";
import useTheme from "../../../../../hooks/useTheme";

interface IProps {
  type: string;
  config: IChartConfig;
}
const ChartRender = memo(({ type, config }: IProps) => {
  const [span, setSpan] = useState(6);
  const { ref, width, height } = useElementSize();
  const { isDark } = useTheme();

  const { Component, defaultConfig, chartData } = useMemo(() => {
    const result = chartJs.getChart(type);

    const tmp: any = {
      Component: result?.Component || null,
      defaultConfig: {
        ...(result?.defaultConfig || {}),
        ...config,
        // sort: {
        //   reverse: true,
        // },
        stacked: true,
        yField: "price",
        xField: "month",
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
      console.log("Testee vvv v dataArray config: ", test);

      return { ...tmp, defaultConfig: config, chartData: test };
    } catch (error) {
      console.error("Error parsing string to JSON : ", error);
    }

    return { ...tmp, chartData: [] };
  }, [type, config]);

  useEffect(() => {
    console.log("Testee this chart defaultConfig; ", {
      ...defaultConfig,
      data: chartData,
    });
  }, [defaultConfig]);

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
