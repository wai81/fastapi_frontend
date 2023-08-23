import { 
    Refine,
    WelcomePage,
    Authenticated, 
} from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { AuthPage,ErrorComponent
,notificationProvider
,RefineSnackbarProvider
,ThemedLayoutV2} from '@refinedev/mui';


import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { ColorModeContextProvider } from "./contexts/color-mode";
//import { Header } from "./components/header";
import { MuiInferencer } from "@refinedev/inferencer/mui";
// import {dataProvider} from "./providers/data-provider";
import axios, {AxiosRequestConfig} from "axios";
import {API_URL, TOKEN_KEY} from "./constants";
import {Header, Layout, Sider, Title} from "./components/layout";
import {OffLayoutArea} from "./components/offLayoutArea";

import {Business, AdminPanelSettings, AccountCircle, Settings} from "@mui/icons-material/";
import {useTranslation} from "react-i18next";
import {authProvider} from "./providers/auth-provider";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        if (request.headers) {
            request.headers["Authorization"] = `Bearer ${token}`;
        } else {
            request.headers = {
                Authorization: `Bearer ${token}`,
            };
        }
    }
    return request;
});


function App() {
    const {t, i18n} = useTranslation();
    const token = localStorage.getItem(TOKEN_KEY);
    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <CssBaseline />
                    <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
                    <RefineSnackbarProvider>
                        <Refine
                            //dataProvider={dataProvider(API_URL, axiosInstance)}
                            dataProvider={dataProvider(
                                "https://api.fake-rest.refine.dev",
                            )}
                            routerProvider={routerBindings}
                            i18nProvider={i18nProvider}
                            authProvider={authProvider(axiosInstance)}
                            options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                }}
                            notificationProvider={notificationProvider}
                            resources={[
                                {
                                    name: "blog_posts",
                                    list: "/blog-posts",
                                    show: "/blog-posts/show/:id",
                                    create: "/blog-posts/create",
                                    edit: "/blog-posts/edit/:id",
                                },{
                                    name: "settings",
                                    meta: {
                                        icon: <Settings/>,                                   },
                                },{
                                    name: "organizations",
                                    list: "/settings/organizations",
                                    create: "/settings/organizations/create",
                                    edit: "/settings/organizations/edit/:id",
                                    show: "/settings/organizations/show/:id",
                                    meta: {
                                        icon: <Business/>,
                                        parent: "settings",
                                    },
                                },{
                                    name: "admin",
                                    meta: {
                                        icon: <AdminPanelSettings/>,
                                    },
                                },{
                                    name: "users",
                                    list: "/admin/users",
                                    create: "/admin/users/create",
                                    edit: "/admin/users/edit/:id",
                                    show: "/admin/users/show/:id",
                                    meta: {
                                        icon: <AccountCircle/>,
                                        parent: "admin",
                                    },
                                },
                            ]}
                        >
                            <Routes>
                                <Route element={
                                  // <ThemedLayoutV2>
                                  //     <Outlet />
                                  // </ThemedLayoutV2>
                                    <Layout
                                        Header={Header}
                                        Title={Title}
                                        Sider={Sider}
                                        OffLayoutArea={OffLayoutArea}
                                    >
                                        <Outlet/>
                                    </Layout>

                                } >
                                    <Route index element={<NavigateToResource resource="blog_posts" />} />
                                    <Route path="blog-posts">
                                        <Route index element={<MuiInferencer />} />
                                        <Route
                                            path="show/:id"
                                            element={<MuiInferencer />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<MuiInferencer />}
                                        />
                                        <Route
                                            path="create"
                                            element={<MuiInferencer />}
                                        />
                                    </Route>
                                    <Route path="*" element={<ErrorComponent />} />
                                </Route>
                            </Routes>
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>
                    </RefineSnackbarProvider>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
      );
};

export default App;
