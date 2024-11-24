import { Container, Grid, Select, SimpleGrid } from "@mantine/core";
import { orderBy } from "lodash";
import useStore from "../../../../../../../hooks/useStore";
import { IData } from "../../../../../../../utils/types";
import { useChartStore } from "../../../store";
import { useState } from "react";
import chartJs from "../../../../../../../utils/charts";
import CHART_STORE_ACTIONS_ENUM from "../../../store/actions";

const monthOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type TSortMethod = <T = unknown>(
  data: T[],
  field: string,
  order: "asc" | "desc"
) => T[];

const dateFn: TSortMethod = (data, field, order) => {
  if (!data?.length || !field?.length) {
    return data;
  } else {
    const monthsOnly = data.filter((each: any) =>
      monthOrder.includes(each[field])
    );
    const sortedData = orderBy(
      monthsOnly,
      [(item: any) => monthOrder.indexOf(item[field])],
      [order]
    );

    return sortedData;
  }
};

function numberFn<T = Record<string, string | number>>(
  data: T[],
  field: string,
  order: "asc" | "desc"
) {
  if (!data?.length || !field?.length) {
    return data;
  } else {
    const sortedData: T[] = orderBy(data, (item: any) => Number(item[field]), [
      order,
    ]);

    return sortedData;
  }
}

const SORT_METHODS: Record<string, { type: string; method: TSortMethod }> = {
  Date: {
    type: "date",
    method: dateFn,
  },
  Number: {
    type: "number",
    method: numberFn,
  },
};

const ChartToolsSort = () => {
  const [field, setField] = useState<"xField" | "yFiled" | null>(null);
  const { id, store, dispatch } = useChartStore();
  const { data } = useStore()?.store;

  const sortType = (type: string | null) => {
    console.log("Testee on sort type : ", type);
    if (type && field) {
      const tmp = data?.find((chart) =>
        chart.charts?.find((chart) => chart.type)
      );

      if (tmp) {
        const fieldKey = store?.options?.[field];
        if (fieldKey) {
          const sortedData = SORT_METHODS[type].method(
            tmp.data,
            fieldKey,
            "asc"
          );
          console.log("Testee sortedData : ", sortedData);
          dispatch({
            type: CHART_STORE_ACTIONS_ENUM.UPDATE_OPTIONS,
            payload: { data: sortedData },
          });
          return sortedData;
        }
      }

      return [];
    }
  };

  return (
    <Container mt={"lg"} fluid>
      <Grid>
        <Grid.Col span={2}>Sort: </Grid.Col>
        <Grid.Col span={5}>
          <Select
            placeholder="X/Y field"
            data={["xField", "yField"]}
            onChange={(field) => setField(field as "xField" | "yFiled" | null)}
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <Select
            placeholder="Type"
            data={Object.keys(SORT_METHODS)}
            onChange={(value) => sortType(value)}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ChartToolsSort;
