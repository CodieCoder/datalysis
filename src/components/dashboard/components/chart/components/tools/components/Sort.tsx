import { Container, Grid, Select, SimpleGrid } from "@mantine/core";
import { orderBy } from "lodash";

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

function dateFn<T = Record<string, string | number>>(
  data: T[],
  field: string,
  order: "asc" | "desc"
) {
  if (!data?.length || !field?.length) {
    return data;
  } else {
    const monthsOnly = data.filter((each: any) =>
      monthOrder.includes(each[field])
    );
    const sortedData: T[] = orderBy(
      monthsOnly,
      [(item: any) => monthOrder.indexOf(item[field])],
      [order]
    );

    return sortedData;
  }
}

function numberFn<T = Record<string, string | number>>(
  data: T[],
  field: string,
  order: "asc" | "desc"
) {
  if (!data?.length || !field?.length) {
    return data;
  } else {
    const sortedData: T[] = orderBy(
      data,
      [(item: any) => item[field]],
      [order]
    );

    return sortedData;
  }
}

const SORT_METHODS = {
  Date: {
    type: "date",
    method: dateFn,
  },
  Numbeer: {
    type: "number",
    method: numberFn,
  },
};

const ChartToolsSort = () => {
  return (
    <Container mt={"lg"} fluid>
      <Grid>
        <Grid.Col span={2}>Sort: </Grid.Col>
        <Grid.Col span={5}>
          <Select placeholder="X/Y field" data={["X-field", "Y-field"]} />
        </Grid.Col>
        <Grid.Col span={5}>
          <Select placeholder="Type" data={["X-field", "Y-field"]} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ChartToolsSort;
