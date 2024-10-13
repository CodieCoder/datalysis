import {
  Button,
  ButtonProps,
  createPolymorphicComponent,
  Flex,
  FlexProps,
} from "@mantine/core";
import { forwardRef } from "react";
import Icon, { IIcon } from "../Icon";

interface CustomButtonProps extends Partial<Pick<IIcon, "icon">>, ButtonProps {
  iconProps?: Omit<IIcon, "icon">;
  childrenFlexProps?: FlexProps;
  extra?: React.ReactNode;
  isHide?: boolean;
}

const Btn = createPolymorphicComponent<"button", CustomButtonProps>(
  forwardRef<HTMLButtonElement, CustomButtonProps>(
    ({ iconProps, extra, isHide, ...props }, ref) =>
      !isHide ? (
        <Button
          style={{ cursor: "pointer", ...(props.style || {}) }}
          variant={"gradient"}
          justify={"space-between"}
          ref={ref}
          leftSection={
            <div>
              {props.icon ? <Icon icon={props.icon} {...iconProps} /> : null}
            </div>
          }
          rightSection={<div>{extra}</div>}
          loaderProps={{ type: "dots" }}
          {...props}
        >
          {props.children}
        </Button>
      ) : null
  )
);

export default Btn;
