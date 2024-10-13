import { useMediaQuery } from "@mantine/hooks";

const useDevice = () => {
  const isDesktop = useMediaQuery("(min-width: 56.25em)");

  return { isMobile: !isDesktop, isDesktop };
};

export default useDevice;
