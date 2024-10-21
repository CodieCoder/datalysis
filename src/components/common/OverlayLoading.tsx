import { LoadingOverlay, LoadingOverlayProps } from "@mantine/core";

interface IProps extends LoadingOverlayProps {}

const OverlayLoading = (props: IProps) => {
  return (
    <LoadingOverlay
      zIndex={1000}
      overlayProps={{ radius: "sm", blur: 2 }}
      {...props}
    />
  );
};

export default OverlayLoading;
