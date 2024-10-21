import {
  Affix,
  Box,
  ThemeIcon,
  Transition,
  Button,
  ActionIcon,
} from "@mantine/core";
// import Button from "../../../common/Button";
import Icon from "../../../Icon";

interface IProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const FloatingMenu = ({ isDrawerOpen, toggleDrawer }: IProps) => {
  return (
    <>
      {" "}
      <Affix position={{ bottom: 70, left: 30 }}>
        <Transition transition={"slide-right"} mounted={!isDrawerOpen}>
          {(transitionStyles) => (
            <ActionIcon
              className="floating-btn"
              radius={"100%"}
              variant={"gradient"}
              h={"3rem"}
              w={"3rem"}
              style={transitionStyles}
              onClick={toggleDrawer}
            >
              <Icon icon={"Plus"} size={"2rem"} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default FloatingMenu;
