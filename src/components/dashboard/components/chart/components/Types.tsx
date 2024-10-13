import { Flex, Group } from "@mantine/core";
import Btn from "../../../../common/Button";
import { CHART_TYPES, GLOBAL_CONSTANTS } from "../../../../../utils/constants";
import { useMemo } from "react";
import { getChartTypeLabel } from "../../../../../utils/utils";

interface IProps {
  types: CHART_TYPES[];
  onClick: (type: CHART_TYPES) => void;
  isLoading?: boolean;
}

const ChartTypes = ({ types, onClick, isLoading }: IProps) => {
  const render = useMemo(() => {
    const result = {
      show: types.slice(0, GLOBAL_CONSTANTS.CHART_TYPES_MAX),
      hide: [],
    };
    const isMore = types.length > GLOBAL_CONSTANTS.CHART_TYPES_MAX;
    if (isMore) {
      result.hide = types.slice(GLOBAL_CONSTANTS.CHART_TYPES_MAX) as any;
    }

    return result;
  }, [types]);

  return (
    <Flex justify={"center"}>
      {render.show?.length ? (
        <Group>
          {render.show?.map((type) => (
            <Btn key={type} onClick={() => onClick(type)} loading={isLoading}>
              {getChartTypeLabel(type)}
            </Btn>
          ))}
          {render.hide?.length ? <Btn loading={isLoading}>More</Btn> : null}
        </Group>
      ) : null}
    </Flex>
  );
};

export default ChartTypes;
