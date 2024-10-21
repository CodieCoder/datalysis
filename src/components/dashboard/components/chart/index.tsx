import { Box } from "@mantine/core";
import { memo, useMemo } from "react";
import useStore from "../../../../hooks/useStore";
import { isEmpty } from "lodash";
import { Carousel } from "@mantine/carousel";
import { useElementSize } from "@mantine/hooks";
import "../../styles/chart.scss";
import useTheme from "../../../../hooks/useTheme";
import Icon from "../../../Icon";
import EachDataDashboard from "./components/EachDataDashboard";

const ChartContainer = memo(() => {
  const { store } = useStore();
  const { ref, height, width } = useElementSize();
  const { isDark } = useTheme();

  const availableCharts =
    store?.data?.filter((data) => {
      return data.charts?.some((chart) => !isEmpty(chart.type));
    }) || [];

  // , [store?.data, height, width]);

  return (
    <Box h={"100%"} w={"100%"} ref={ref}>
      {availableCharts?.length ? (
        <Carousel
          h={height || "100%"}
          draggable={false}
          style={{ flex: 1 }}
          previousControlIcon={<Icon icon={"LeftSimpleArrow"} />}
          nextControlIcon={<Icon icon={"RightSimpleArrow"} />}
          previousControlProps={{
            className: isDark
              ? `data-carousel-controls-dark`
              : "data-carousel-controls-light",
          }}
        >
          {availableCharts?.map((data) => (
            <Carousel.Slide key={data.id} h={height || "100%"} w={width}>
              <EachDataDashboard
                data={data}
                height={height || "100%"}
                width={width}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <>No data to work with!</>
      )}
    </Box>
  );
});

export default ChartContainer;
