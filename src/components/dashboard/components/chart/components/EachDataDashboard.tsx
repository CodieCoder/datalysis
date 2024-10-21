import { Box, Stack } from "@mantine/core";
import { IChart, IData } from "../../../../../utils/types";
import OverlayLoading from "../../../../common/OverlayLoading";
import ChartParent from "./Charts";
import ChartRender from "./ChartRender";
import ChartTypes from "./Types";
import { memo, useCallback, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { useSimpleToast } from "simple-tailwind-toast";
import useStore from "../../../../../hooks/useStore";
import useGetChart from "../../../../../hooks/useGetChart";
import useData from "../../../../../hooks/useData";
import { CHART_TYPES } from "../../../../../utils/constants";
import { extractChartConfig } from "../../../../../utils/utils";

interface IProps {
  data: IData;
  height: number | string;
  width: number;
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
                      const tmpChartConfig: IChart = {
                        ...each,
                        config: {
                          data: payload.data,
                          xField: "first_name",
                          yField: "price",
                        },
                      };
                      return tmpChartConfig;
                    } else {
                      return each;
                    }
                  });

                  //update chart data
                  if (thisType) {
                    const updatedChart: IData = { ...chart, charts: thisType };

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

  const { charts, types } = useMemo(() => {
    const charts = data.charts?.filter((chart) => !isEmpty(chart.config)) || [];
    const types = [...(data.charts || [])].map((chart) => chart.type);
    return { charts, types };
  }, [data]);

  return (
    <Box h={height} px={"xl"}>
      {/* <OverlayLoading visible={getChart.isPending} opacity={0.2} /> */}

      <Stack h={height} align="stretch" justify="space-between">
        <Box style={{ overflow: "auto" }}>
          <ChartParent
            charts={charts!.map((chart) => ({
              key: chart.type,
              component: (
                <ChartRender
                  type={chart.type}
                  config={{ ...globalChartConfig, ...chart.config }}
                />
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
