import { Box, Group } from "@mantine/core";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import useStore from "../../../../hooks/useStore";
import { isEmpty } from "lodash";
import { Carousel, Embla } from "@mantine/carousel";
import { useElementSize } from "@mantine/hooks";
import "../../styles/chart.scss";
import useTheme from "../../../../hooks/useTheme";
import Icon from "../../../Icon";
import EachDataDashboard from "./components/EachDataDashboard";
import Btn from "../../../common/Button";
import useEmblaCarousel from "embla-carousel-react";

const ChartContainer = memo(() => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    draggable: false,
    loop: true,
  });
  const { store } = useStore();
  const { ref, height, width } = useElementSize();
  const { isDark } = useTheme();

  const availableCharts =
    store?.data?.filter((data) => {
      return data.charts?.some((chart) => !isEmpty(chart.type));
    }) || [];

  const prevScroll = () => {
    if (!emblaApi) {
      return;
    }
    emblaApi?.scrollPrev();
  };

  const nextScroll = () => {
    if (!emblaApi) return;

    emblaApi.scrollNext();
  };

  return (
    <Box h={height || "100%"} w={"100%"} className="carousel">
      <div onClick={prevScroll} className="controls control-left">
        <Icon icon="LeftSimpleArrow" />
      </div>
      {availableCharts?.length ? (
        <div className="embla" ref={emblaRef}>
          <div
            className="embla__container"
            style={{
              height: height || "100%",
            }}
          >
            {availableCharts?.map((data) => (
              <div className="embla__slide" key={data.id}>
                <EachDataDashboard data={data} height={height || "100%"} />
              </div>
            ))}
          </div>
          <div onClick={nextScroll} className="controls control-right">
            <Icon icon="RightSimpleArrow" />
          </div>
        </div>
      ) : (
        <>No data to work with!</>
      )}
    </Box>
  );
});

export default ChartContainer;
