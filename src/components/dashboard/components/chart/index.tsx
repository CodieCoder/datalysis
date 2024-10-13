import { Box, LoadingOverlay, Stack } from "@mantine/core";
import ChartTypes from "./components/Types";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useStore from "../../../../hooks/useStore";
import { CHART_TYPES } from "../../../../utils/constants";
import useGetChart from "../../../../hooks/useGetChart";
import { useSimpleToast } from "simple-tailwind-toast";
import generateChartCode from "../../../../utils/generateChartCode";
import useData from "../../../../hooks/useData";
import { extractChartConfig } from "../../../../utils/utils";
import ChartRender from "./components/ChartRender";
import ChartParent from "./components/Charts";
import { IChart, IData } from "../../../../utils/types";
import _ from "lodash";

const ChartContainer = memo(() => {
  const [globalChartConfig, setGlobalChartConfig] = useState<
    Record<string, any>
  >({});
  const { toast } = useSimpleToast();
  const { store } = useStore();
  const getChart = useGetChart();
  const { updateData } = useData();

  const types = useMemo(() => {
    return store?.data
      ?.filter((each) => each.charts?.length)
      ?.flatMap((each) =>
        each.charts?.map((chart) => chart.type)
      ) as CHART_TYPES[];
  }, [store?.data]);

  const getChartFn = useCallback(
    (type: CHART_TYPES) => {
      const chart = store?.data?.find((each) =>
        each.charts?.find((chart) => chart.type === type)
      );

      if (chart && chart.id) {
        const { charts, id, ...payload } = chart;

        getChart.mutate(
          { ...payload, type },
          {
            onSuccess: (response) => {
              if (response?.data) {
                //parse the js code here
                const chartConfig = extractChartConfig(response.data);

                if (chartConfig && chartConfig?.length > 20) {
                  const thisType = chart.charts?.map((each) => {
                    if (each.type === type) {
                      // const tmp: IChart = { ...each, config: chartConfig };
                      const tmp: IChart = {
                        ...each,
                        config: {
                          data: payload.data,
                          xField: "first_name",
                          yField: "price",
                        },
                      };
                      return tmp;
                    } else {
                      return each;
                    }
                  });
                  // const chartConfig = extractChartConfig(chartCode);
                  // const chartConfig = extractChartConfig(chartCode);

                  //update chart data
                  if (thisType) {
                    const tmp: IData = { ...chart, charts: thisType };

                    updateData(id, tmp);
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

  const availableCharts = useMemo(() => {
    const charts: IChart[] = [];
    const tmp = store?.data;
    // ?.filter((each) =>
    //   each.charts?.some((e) => e.config?.length > 10)
    // );

    // console.log("Testee tmp : ", tmp);

    tmp.forEach((each) => {
      if (each.charts?.length) {
        const temp = each.charts?.filter((chart) => !_.isEmpty(chart.config));

        charts.push(...temp);
      }
    });

    return charts;
  }, [store?.data]);

  return (
    <Box h={"100%"} pos={"relative"}>
      <LoadingOverlay
        visible={getChart.isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Stack h={"100%"} align="stretch" justify="space-between">
        <Box style={{ overflow: "auto" }}>
          {availableCharts?.length ? (
            <ChartParent
              charts={availableCharts?.map((chart) => ({
                key: chart.type,
                component: (
                  <ChartRender
                    type={chart.type}
                    config={{ ...globalChartConfig, ...chart.config }}
                  />
                ),
              }))}
            />
          ) : null}
        </Box>
        <Box>
          {types?.length ? (
            <ChartTypes
              types={types}
              onClick={getChartFn}
              isLoading={getChart.isPending}
            />
          ) : null}
        </Box>
      </Stack>
    </Box>
  );
});

export default ChartContainer;
