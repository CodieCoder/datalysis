import { Burger } from "@mantine/core";
interface IProps {
  isOpen?: boolean;
  toggle: () => void;
}

const ChartToolsMenu = ({ isOpen, toggle }: IProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Burger
        opened={isOpen}
        onClick={toggle}
        aria-label="Toggle navigation"
        size={"xs"}
      />
    </div>
  );
};

export default ChartToolsMenu;
