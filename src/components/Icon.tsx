import { FC, memo, useMemo } from "react";

const icons = {
  FileGood: "uil-file-check-alt",
  FileBad: "uil-file-block-alt",
  AddFile: "uil-file-plus-alt",
  SearchFile: "uil-file-search-alt",
  ChartCompare: "uil-comparison",
  Chart: "uil-chart",
  Brightness: "uil-brightness",
  Moon: "uil-moon",
  LeftArrow: "uil-arrow-left",
  LeftSimpleArrow: "uil-angle-left-b",
  RightSimpleArrow: "uil-angle-right-b",
  DownArrow: "uil-angle-down",
  Fullscreen: "uil-expand-arrows",
  ExitFullscreen: "uil-compress-arrows",
  Minimize: "uil-minus",
  Brain: "uil-brain",
  User: "uil-user",
  Plus: "uil-plus",
  Close: "uil-times",
  InfoCircle: "uil-info-circle",
};

type TIconSize = "default" | "large" | "small" | string;

export interface IIcon extends React.HTMLAttributes<HTMLElement> {
  icon: keyof typeof icons;
  size?: TIconSize;
}

const Icon: FC<IIcon> = memo(({ icon, size = "default", ...props }) => {
  const _size: TIconSize = useMemo(() => {
    const result =
      size === "small"
        ? "1rem"
        : size === "default"
        ? "1.5rem"
        : size === "large "
        ? "4rem"
        : size;
    return result;
  }, [size]);

  return (
    <i
      className={`uil ${icons[icon]}`}
      {...props}
      style={{ ...(props?.style || {}), fontSize: _size }}
    ></i>
  );
});

export default Icon;
