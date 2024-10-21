import { Text } from "@mantine/core";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import Icon from "../../../../Icon";
import Btn from "../../../../common/Button";
import useData from "../../../../../hooks/useData";
import { useCallback, useEffect, useMemo } from "react";
import { IChart } from "../../../../../utils/types";
import { isEmpty } from "lodash";

interface IProps {
  addDataToggle: () => void;
}

const ViewData = ({ addDataToggle }: IProps) => {
  const { getCurrentData: currentData, store, updateCurrentData } = useData();

  const selectData = useCallback((id: string) => updateCurrentData(id), []);
  const isChartAvailable = useCallback(
    (charts: IChart[] | undefined) => {
      if (!charts?.length) return false;

      return charts?.some((chart) => !isEmpty(chart.config));
    },
    [store?.data]
  );

  const allData = useMemo(() => {
    const dataList: SpotlightActionData[] = store?.data
      ?.filter((data) => Boolean(data.id))
      ?.map(({ id, label, charts, description }) => {
        const spotlightData: SpotlightActionData = {
          id: id!,
          label,
          description,
          onClick: () => currentData.id != id && selectData(id!),
          rightSection: isChartAvailable(charts) ? <Icon icon="Chart" /> : null,
        };

        return spotlightData;
      });

    return dataList;
  }, [store?.data]);

  useEffect(() => {
    console.log("Testee store : ", allData);
  }, [allData, currentData]);

  return (
    <>
      {currentData ? (
        <Btn
          onClick={spotlight.open}
          size={"xs"}
          variant={"filled"}
          extra={<Icon icon="DownArrow" />}
        >
          <Text size="sm">{currentData.label}</Text>
        </Btn>
      ) : (
        <Btn variant={"light"} onClick={addDataToggle}>
          Add data to begin!
        </Btn>
      )}
      <Spotlight
        actions={allData}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <Icon icon={"SearchFile"} />,
          placeholder: "Search saved data...",
        }}
      />
    </>
  );
};

export default ViewData;
