import { Box, Stack } from "@mantine/core";
import { IChart, IData } from "../../../../../utils/types";
import ChartParent from "./Charts";
import ChartRender from "./ChartRender";
import ChartTypes from "./Types";
import { memo, useCallback, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { useSimpleToast } from "simple-tailwind-toast";
import useStore from "../../../../../hooks/useStore";
import useGetChart from "../../../../../hooks/useGetChart";
import useData from "../../../../../hooks/useData";
import { extractChartConfig, minifyJsonData } from "../../../../../utils/utils";
import { CHART_TYPES } from "../../../../../constants/chart";
import ChartStoreProvider from "../store";

interface IProps {
  data: IData;
  height?: number | string;
  width?: number;
}

const EachDataDashboard = memo(({ data, height, width }: IProps) => {
  const [globalChartConfig, setGlobalChartConfig] = useState<
    Record<string, any>
  >({});
  const { toast } = useSimpleToast();
  const { store } = useStore();
  const getChart = useGetChart();
  const { updateData } = useData();

  const getChartFn = useCallback(
    (type: CHART_TYPES, chart: IData) => {
      if (chart && chart.id) {
        const { charts, id, data: chartData, ...payload } = chart;

        getChart.mutate(
          { ...payload, type, data: JSON.stringify(minifyJsonData(chartData)) },
          {
            onSuccess: (response) => {
              if (response?.data) {
                //parse the js code here
                // const chartConfig = extractChartConfig(response.data);
                const chartConfig = JSON.stringify(response.data);

                if (chartConfig && chartConfig?.length > 20) {
                  const config = JSON.parse(chartConfig) as Record<string, any>;

                  const thisType = chart.charts?.map((each) => {
                    if (each.type === type) {
                      const tmpChartConfig: IChart = {
                        ...each,
                        config,
                      };
                      return tmpChartConfig;
                    } else {
                      return each;
                    }
                  });

                  //update chart data
                  if (thisType) {
                    const updatedChart: IData = {
                      ...chart,
                      charts: thisType,
                    };

                    updateData(id, updatedChart);
                  }
                }
              }
            },
            onError: () => {
              toast.add({
                content: {
                  title: "An error occured. Could not generate chart!",
                  type: "error",
                },
              });
            },
          }
        );
      } else {
        return;
      }
    },
    [store?.data]
  );

  const {
    charts,
    types,
    data: chartData,
    label,
    description,
    id,
  } = useMemo(() => {
    const { charts: xCharts, ...rest } = data;
    const charts = xCharts?.filter((chart) => !isEmpty(chart.config)) || [];
    const types = [...(data.charts || [])].map((chart) => chart.type);
    return { ...rest, charts, types };
  }, [data]);

  return (
    <Box h={height}>
      {/* <OverlayLoading visible={getChart.isPending} opacity={0.2} /> */}

      <Stack h={height} align="stretch" justify="space-between">
        <Box style={{ overflow: "auto" }}>
          <ChartParent
            charts={charts!.map((chart) => ({
              key: chart.type,
              component: (
                <ChartStoreProvider id={chart.type} key={chart.type}>
                  <ChartRender
                    type={chart.type}
                    config={{ ...globalChartConfig, ...chart.config }}
                    chartData={chartData}
                    label={label}
                    description={description}
                    id={id}
                  />
                </ChartStoreProvider>
              ),
            }))}
          />
        </Box>
        <Box>
          <ChartTypes
            types={types}
            onClick={(type) => getChartFn(type, data)}
            isLoading={getChart.isPending}
          />
        </Box>
      </Stack>
    </Box>
  );
});

export default EachDataDashboard;
