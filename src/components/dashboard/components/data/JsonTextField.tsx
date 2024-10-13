import { JsonInput, JsonInputProps } from "@mantine/core";

interface IProps extends JsonInputProps {
  json?: string;
  setjson: (json: string) => void;
}

const JsonTextField = ({ json, setjson, ...props }: IProps) => {
  return <JsonInput {...props} value={json} onChange={setjson} />;
};

export default JsonTextField;
