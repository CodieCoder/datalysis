import { TextInput } from "@mantine/core";
import { memo, useEffect, useState } from "react";
import { useSimpleToast } from "simple-tailwind-toast";
import useData from "../../../../hooks/useData";

interface IProps {
  isLoading?: boolean;
  onSubmit: (prompt: string, callback: (isSuccess?: boolean) => void) => void;
}

const GptTextField = memo(({ isLoading, onSubmit }: IProps) => {
  const [value, setValue] = useState<string>();

  const { getCurrentData: currentData } = useData();
  const { toast } = useSimpleToast();

  const onSend = (
    currentPrompt: string,
    callback: (isValid?: boolean) => void
  ) => {
    if (!currentPrompt?.length || !currentData?.data.length) {
      toast.add({
        content: {
          title: `I can't answer your question if there is ${
            !currentPrompt?.length ? "none" : ""
          } ${!currentData ? "no data" : ""}!`,
          type: "warning",
        },
      });

      return;
    }

    onSubmit(currentPrompt, callback);
  };

  return (
    <TextInput
      placeholder="Example: Explain the data in simple terms"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && value?.length) {
          onSend(value, (isValid) => isValid && setValue(undefined));
        }
      }}
      style={{
        width: "100%",
      }}
      size="lg"
      enterKeyHint={"send"}
      disabled={isLoading}
      //   rightSection={<Center bg={"dark"} w={"2rem"} h={"2rem"}> > </Center>}
    />
  );
});

export default GptTextField;
