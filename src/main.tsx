import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "./store";
import theme from "./theme";
import App from "./App.tsx";
import GlobalAlert from "./components/GlobalAlert";
import "./index.css";

const {
  VITE_IDENTITY_POOL_ID,
  VITE_USER_POOL_ID,
  VITE_CLIENT_ID,
  VITE_ENDPOINT,
  VITE_REGION,
  VITE_ACCOUNT_ID,
  VITE_ENV,
  VITE_BUCKET_NAME,
} = import.meta.env;

Amplify.configure(
  {
    Auth: {
      Cognito: {
        identityPoolId: VITE_IDENTITY_POOL_ID,
        userPoolId: VITE_USER_POOL_ID,
        allowGuestAccess: false,
        userPoolClientId: VITE_CLIENT_ID,
      },
    },
    API: {
      REST: {
        EmployeeDirectory: {
          endpoint: VITE_ENDPOINT,
          region: VITE_REGION,
        },
      },
    },
    Storage: {
      S3: {
        bucket: VITE_BUCKET_NAME,
        region: VITE_REGION,
      },
    },
  },
  {
    API: {
      REST: {
        headers: async () => {
          return {
            Authorization: `Bearer ${
              (await fetchAuthSession())?.tokens?.accessToken?.toString() ?? ""
            }`,
            env: VITE_ENV,
            region: VITE_REGION,
            account: VITE_ACCOUNT_ID,
          };
        },
      },
    },
  }
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <GlobalAlert />
    </ThemeProvider>
  </Provider>
);
