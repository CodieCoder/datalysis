import { Box, TextInput } from "@mantine/core";
import JsonTextField from "./JsonTextField";

interface IProps {
  label?: string;
  setLabel: (label: string) => void;
  description?: string;
  setDescription: (description: string) => void;
  json: string;
}

const SaveDataPage = ({
  label,
  setLabel,
  description,
  setDescription,
  json,
}: IProps) => {
  return (
    <Box>
      <Box mt={"lg"}>
        <TextInput
          key={"label"}
          label={"Label"}
          description={"Give your data a title"}
          placeholder="Example: Sales record of my restaurant"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </Box>
      <Box mt={"lg"}>
        <TextInput
          key={"description"}
          label={"Description"}
          height={"5rem"}
          description={"Add aditional description to improve accuracy."}
          placeholder="It contains food ordered, price, date and customer's name"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <Box mt={"2rem"}>
        <JsonTextField
          json={json}
          setjson={() => {}}
          //   disabled
          readOnly
          rows={18}
          style={{
            height: "100%",
          }}
        />
      </Box>
    </Box>
  );
};

export default SaveDataPage;
