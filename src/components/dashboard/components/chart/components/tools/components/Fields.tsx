import {
  Box,
  Container,
  Fieldset,
  Select,
  Space,
  Tooltip,
} from "@mantine/core";
import { useCallback, useMemo } from "react";
import { useChartStore } from "../../../store";
import useStore from "../../../../../../../hooks/useStore";
import Icon from "../../../../../../Icon";
import CHART_STORE_ACTIONS_ENUM from "../../../store/actions";
import chartJs from "../../../../../../../utils/charts";

const ChartToolFields = () => {
  const { id, store, dispatch: _dispatch } = useChartStore();
  const { data } = useStore()?.store;

  const options = useMemo(() => store?.options, [store?.options]);
  const dispatch = useCallback(_dispatch, [options]);

  const dataProperties = useMemo(() => {
    const tmp = data?.find((chart) =>
      chart.charts?.find((chart) => chart.type)
    );

    if (tmp) {
      //   const datatArray = JSON.parse(tmp.data) as Array<Object>;
      //   const dataArray = chartJs.dataToArray();

      const dataProps = tmp.data.reduce((prev: string[], current) => {
        const props = Object.keys(current);
        return Array.from(new Set([...prev, ...props]));
      }, [] as string[]);
      return dataProps;
    } else {
      return [];
    }
  }, [data]);

  const onSelect = (field: "xField" | "yField", value: string) => {
    const payload = {
      [field]: value,
    };

    dispatch({ type: CHART_STORE_ACTIONS_ENUM.UPDATE_OPTIONS, payload });
  };

  return (
    <Container fluid>
      <Select
        rightSection="X"
        placeholder="Choose X field"
        data={dataProperties}
        size={"xs"}
        leftSection={
          <Tooltip
            label="Select the property for X-axis (the vertical axis)"
            withArrow
          >
            <Box>
              <Icon icon="InfoCircle" />
            </Box>
          </Tooltip>
        }
        onChange={(value) => {
          value && onSelect("xField", value);
        }}
      />
      <Space h={"0.3rem"} />
      <Select
        rightSection="Y"
        placeholder="Choose Y field"
        data={dataProperties}
        size={"xs"}
        leftSection={
          <Tooltip
            label="Select the property for Y-axis (the vertical axis)"
            withArrow
          >
            <Box>
              <Icon icon="InfoCircle" />
            </Box>
          </Tooltip>
        }
        onChange={(value) => {
          value && onSelect("yField", value);
        }}
      />
    </Container>
  );
};

export default ChartToolFields;
