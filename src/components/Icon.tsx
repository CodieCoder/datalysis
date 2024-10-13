import { FC, memo, useMemo } from "react";

const icons = {
  FileGood: "uil-file-check-alt",
  FileBad: "uil-file-block-alt",
  ChartCompare: "uil-comparison",
  Chart: "uil-chart",
  Brightness: "uil-brightness",
  Moon: "uil-moon",
  AddFile: "uil-file-plus-alt",
  LeftArrow: "uil-arrow-left",
  Fullscreen: "uil-expand-arrows",
  Minimize: "uil-minus",
  ExitFullscreen: "uil-compress-arrows",
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
