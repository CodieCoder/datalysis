import { Drawer, Title, Text, Box, Stack } from "@mantine/core";
import { FC, useMemo, useState } from "react";
import FileUpload from "./FileUpload";
import JsonTextField from "./JsonTextField";
import Icon from "../../../../Icon";
import useData from "../../../../../hooks/useData";
import { useSimpleToast } from "simple-tailwind-toast";
import {
  cleanJsonData,
  fileToString,
  getFileType,
  isValidJsonLength,
  minifyJsonData,
  stringifyFile,
} from "../../../../../utils/utils";
import { useForm } from "@mantine/form";
import { FILE_TYPES } from "../../../../../constants/common";
import useDevice from "../../../../../hooks/useDevice";
import SaveDataPage from "./SaveDataPage";
import { IChart, IData } from "../../../../../utils/types";
import Btn from "../../../../common/Button";
import useGetChartTypes from "../../../../../hooks/useGetChartTypes";
import csvtoJson from "convert-csv-to-json";
import { CHART_TYPES } from "../../../../../constants/chart";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardDataDrawer: FC<IProps> = ({ isOpen, onClose }) => {
  const [json, setJson] = useState<string>();
  const [isError, setIsError] = useState(true);
  const [isFinalStep, setIsFinalStep] = useState(false);
  const [dataLabel, setDataLabel] = useState<string>("");
  const [dataDescription, setDataDescription] = useState<string>("");

  const getChartType = useGetChartTypes();

  const isMobile = useDevice();

  const { toast } = useSimpleToast();
  const { addData } = useData();

  const form = useForm<{ json: string }>({
    mode: "controlled",
    initialValues: {
      json: "",
    },
    validate: {
      json() {
        if (!json?.length || isValidJsonLength(json)) {
          setIsError(false);
          return null;
        } else {
          setIsError(true);
          if (json.length > 1500) {
            return "Maximum character is 1500";
          } else {
            return "Invalid JSON";
          }
        }
      },
    },
  });

  const updateJson = (text: string) => {
    const cleanedJson = cleanJsonData(text);
    setJson(cleanedJson);
  };

  const handleFileUpload = (file?: FileList | null) => {
    if (!file?.[0]) {
      return;
    } else {
      uploadFile(file[0]);
    }
  };

  const uploadFile = async (file?: File) => {
    if (file) {
      if (getFileType(file) === FILE_TYPES.csv) {
        const fileString = await fileToString(file);
        if (fileString) {
          const toJson = csvtoJson
            .utf8Encoding()
            .supportQuotedField(true)
            .indexHeader(1)
            .csvStringToJson(fileString);
          updateJson(JSON.stringify(toJson));
        }

        //TODO: remove paparse if no longer needed
        // parse<File>(file, {
        //   // header: true,
        //   complete: (text) => {
        //     const data = text.data.join();
        //     updateJson(JSON.stringify(data));
        //   },
        // });
        return;
      } else {
        stringifyFile(file, (text) => {
          text && updateJson(text);
        });

        return;
      }
    } else {
      toast.add({
        content: {
          description: "Please select a file to upload",
          type: "warning",
        },
      });
      return;
    }
  };

  const length = useMemo(() => json?.length || 0, [json]);

  const onError = () => {
    setIsFinalStep(false);
    toast.add({
      content: {
        type: "error",
        title: "Opss! Sorry, seems like something went bad. Try again.",
      },
    });
  };

  const submitHandler = async () => {
    if (!json?.length) {
      toast.add({
        content: {
          type: "warning",
          title: "Invalid data. Upload or paste your data.",
        },
      });

      return;
    }

    if (isFinalStep) {
      if (!dataDescription?.length || !dataLabel) {
        toast.add({
          content: {
            type: "warning",
            title: "Label and description cannot not be empty!",
          },
        });

        return;
      }

      //save the data
      const payload: IData = {
        data: minifyJsonData(json),
        label: dataLabel,
        description: dataDescription,
      };

      getChartType.mutate(payload, {
        onSuccess: (response) => {
          if (response.data?.length) {
            const charts = response.data?.map((type: CHART_TYPES) => {
              const tmp: IChart = {
                type,
              };

              return tmp;
            });

            addData({
              ...payload,
              data: json,
              charts,
            });

            onClose();
            setJson(undefined);
            setIsError(true);
            setIsFinalStep(false);
          } else {
            onError();
          }
        },
        onError,
      });
    } else {
      setIsFinalStep(true);
    }
  };

  const isFinalStepError = useMemo(() => {
    if (isFinalStep) {
      return !dataDescription?.length || !dataLabel.length;
    }
    return false;
  }, [isFinalStep, dataDescription?.length, dataLabel.length]);

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      title={
        <Box>
          <Title size={18}>
            <Icon icon={"AddFile"} size="small" /> Add data
          </Title>
        </Box>
      }
      transitionProps={{
        transition: "rotate-left",
        duration: 250,
        timingFunction: "linear",
      }}
    >
      <Box h={"91vh"}>
        <Stack h={"100%"} align="stretch" justify="space-between" gap="md">
          {isFinalStep ? null : (
            <Box h={"20%"} mah={isMobile ? "10rem" : "5rem"}>
              <FileUpload
                onDrop={(files) => handleFileUpload(files as any as FileList)}
              />
            </Box>
          )}
          <Box>
            {isFinalStep && json?.length ? (
              <SaveDataPage
                label={dataLabel}
                setLabel={setDataLabel}
                description={dataDescription}
                setDescription={setDataDescription}
                json={json}
              />
            ) : (
              <JsonTextField
                json={json}
                setjson={(data) => {
                  setJson(data);
                }}
                rows={isMobile ? 22 : 22}
                style={{
                  height: "100%",
                }}
                placeholder="Enter JSON text here"
                description={
                  <div>
                    JSON data
                    <Text
                      size={"xs"}
                      variant={"text"}
                      color={length > 1500 ? "red" : "gray"}
                    >
                      {length}/1500 character
                    </Text>
                  </div>
                }
                error={
                  length > 1500 ? "Exceeded maximum characters!" : undefined
                }
                validationError={"Invalid JSON data!"}
                formatOnBlur={true}
                {...form.getInputProps("json")}
              />
            )}
          </Box>
          <Stack>
            <Btn
              icon="LeftArrow"
              variant={"filled"}
              w={"100%"}
              size={"lg"}
              onClick={() => setIsFinalStep(false)}
              isHide={!isFinalStep}
            >
              Update data
            </Btn>
            <Btn
              w={"100%"}
              size={"lg"}
              type={"button"}
              onClick={submitHandler}
              loading={getChartType.isPending}
              disabled={!length || isFinalStepError}
            >
              {isFinalStep ? "Process data" : "Continue"}
            </Btn>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default DashboardDataDrawer;
