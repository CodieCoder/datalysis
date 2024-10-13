import { Container } from "@mantine/core";
import { Dashboard } from "../components/dashboard";
import { SimpleToaster } from "simple-tailwind-toast";
import "./style.scss";

const AppEntry = () => {
  return (
    <Container fluid p={0}>
      <Dashboard />
      <SimpleToaster
        classNames={{
          types: {
            error: "toaster error",
            info: "toaster info",
            warning: "toaster warning",
            success: "toaster success",
          },
        }}
      />
    </Container>
  );
};

export default AppEntry;
