import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "./routers/routes";
import { persistor, store } from "./store/index";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CustomThemeProvider } from "./context/ThemeContext";
import './i18n';
import FullScreenLoader from "./components/FullScreenLoader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<FullScreenLoader />}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <CustomThemeProvider>
            <AppRoutes />
          </CustomThemeProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            style={{ zIndex: 1000 }}
            theme="dark"
          />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </Suspense>
);
