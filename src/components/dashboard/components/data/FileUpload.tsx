import { Group, Text } from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  MIME_TYPES,
  MS_EXCEL_MIME_TYPE,
} from "@mantine/dropzone";
import { FC } from "react";
import Icon from "../../../Icon";
import useDevice from "../../../../hooks/useDevice";
import Btn from "../../../common/Button";

interface IProps extends DropzoneProps {}

const FileUpload: FC<IProps> = (props) => {
  const isMobile = useDevice();

  return (
    <Dropzone
      onReject={(files) => console.log("rejected files", files)}
      h={"100%"}
      accept={[
        ...MS_EXCEL_MIME_TYPE,
        MIME_TYPES.csv,
        "text/plain",
        "text/json",
        "application/json",
        "application/ld+json",
      ]}
      {...props}
    >
      {isMobile ? (
        <Group justify="center" gap="xs" style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <Icon icon={"FileGood"} color={"#0f0"} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <Icon icon={"FileBad"} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <Icon icon={"AddFile"} color={"#0f0"} size={"large"} />
          </Dropzone.Idle>
          <Text size="sm" inline>
            Drag .JSON, .CSV or .TXT file here or click to select from your
            device
          </Text>
        </Group>
      ) : (
        <Btn w="100%" variant={"outline"}>
          Upload file
        </Btn>
      )}
    </Dropzone>
  );
};

export default FileUpload;
