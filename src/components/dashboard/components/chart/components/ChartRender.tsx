import { useEffect, useMemo, useState } from "react";
import chartJs from "../../../../../utils/charts";
import { IChartConfig } from "../../../../../utils/types";
import ChartBox from "./Chart";
import { isEmpty } from "lodash";
import { useElementSize } from "@mantine/hooks";
import { Grid } from "@mantine/core";

interface IProps {
  type: string;
  config: IChartConfig;
}
const ChartRender = ({ type, config }: IProps) => {
  const [span, setSpan] = useState(6);
  const { ref, width, height } = useElementSize();

  const { Component, defaultConfig, chartData } = useMemo(() => {
    const result = chartJs.getChart(type);

    const tmp = {
      Component: result?.Component || null,
      defaultConfig: { ...(result?.defaultConfig || {}), ...config },
    };

    try {
      const dataArray = JSON.parse(tmp?.defaultConfig?.data);

      const test = dataArray?.map((data: any) => data);

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
          />
        }
        title={type}
        chartRef={ref}
      />
    </Grid.Col>
  ) : null;
};

export default ChartRender;
