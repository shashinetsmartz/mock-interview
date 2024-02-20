import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import MainContainer from "components/MainContainer";
import MainRoute from "router";
import history from "providers/history";
import { ThemeProvider } from "@mui/material/styles";
import MockInterviewTheme from "theme";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "providers/store";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HelmetProvider>
          <ThemeProvider theme={MockInterviewTheme}>
            <Router basename={process.env.PUBLIC_URL} history={history}>
              <MainContainer>
                <MainRoute />
              </MainContainer>
            </Router>
          </ThemeProvider>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
