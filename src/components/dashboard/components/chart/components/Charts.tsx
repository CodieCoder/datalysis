import { Grid } from "@mantine/core";
import { IChartProp } from "../../../../../utils/types";
import { memo } from "react";

interface IProps {
  charts: IChartProp[];
}

const ChartParent = memo(({ charts }: IProps) => {
  return (
    <Grid gutter={"md"} p={"0.5rem"} h={"100%"}>
      {charts?.map((chart) => chart.component)}
    </Grid>
  );
});

export default ChartParent;
