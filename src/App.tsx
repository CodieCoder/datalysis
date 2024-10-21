import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/carousel/styles.css";
import AppEntry from "./mainApp";
import GlobalProvider from "./store/globalStore/Provider";

const theme = createTheme({
  primaryColor: "dark",
  white: "rgb(255, 250, 250)",
  primaryShade: 8,
});

export const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <GlobalProvider>
        <AppEntry />
      </GlobalProvider>
    </MantineProvider>
  );
};

export default App;
