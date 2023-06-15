import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";
import { useRoutes } from "react-router-dom";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import {
  Login,
  Home,
  AllPosts,
  PostDetails,
  CreatePost,
  EditPost,
  Amino,
  Vitamin,
  Powder,
  Gainer,
} from "pages";
import ExtensionIcon from "@mui/icons-material/Extension";
import StoreIcon from "@mui/icons-material/Store";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MedicationIcon from "@mui/icons-material/Medication";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Success from "pages/Success";
import Orders from "pages/Orders";
import Footer from "components/Footer";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      // save user to mongo database
      if (profileObj) {
        const response = await fetch("http://localhost:8080/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        });
        const data = await response.json();

        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          );
        } else Promise.reject();
      }
      localStorage.setItem("token", `${credential}`);

      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }
      window.location.reload();
      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.resolve();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      } else {
        return Promise.resolve({}); // Return an empty object instead of rejecting the promise
      }
    },
  };

  // get user identity from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const resources = [
    {
      name: "posts",
      list: AllPosts,
      show: PostDetails,
      create: CreatePost,
      edit: EditPost,
      options: { label: "All products" },
      icon: <StoreIcon />,
    },
    {
      name: "powder",
      list: Powder,
      show: PostDetails,
      options: { label: "Powders" },
      icon: <ExtensionIcon />,
    },
    {
      name: "amino",
      list: Amino,
      options: { label: "Amino Acids" },
      icon: <FitnessCenterIcon />,
    },
    {
      name: "vitamin",
      list: Vitamin,
      options: { label: "Vitamins" },
      icon: <MedicationIcon />,
    },
    {
      name: "gainer",
      list: Gainer,
      options: { label: "Gainers" },
      icon: <UpgradeIcon />,
    },
    ...(user?.email === process.env.REACT_APP_ADMIN_USER
      ? [
          {
            name: "order",
            list: Orders,
            options: { label: "Orders" },
            icon: <MonetizationOnIcon />,
          },
        ]
      : []),
  ];

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={resources}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          // Footer={Footer}
          Header={Header}
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                element: <Success />,
                path: "/success/:id",
              },
            ],
          }}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
