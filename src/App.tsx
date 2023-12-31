import { 
    Refine,
    Authenticated, 
} from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {ErrorComponent
,notificationProvider
,RefineSnackbarProvider
// ,ThemedLayoutV2
} from '@refinedev/mui';


import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";

import { ColorModeContextProvider } from "./contexts/color-mode";
//import { Header } from "./components/header";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import {dataProvider} from "./providers/data-provider";
// import dataProvider from "@refinedev/simple-rest";
import axios, {AxiosRequestConfig} from "axios";
import {API_URL, TOKEN_KEY} from "./constants";
import {Header, Sider, Title} from "./components/layout_v1";

import {Business, AdminPanelSettings, AccountCircle, Settings} from "@mui/icons-material/";
import {useTranslation} from "react-i18next";
import {authProvider} from "./providers/auth-provider";
import {UserEdit, UserList } from 'pages/users';
import {AuthPage} from "pages/auth";
import { ThemedLayoutV2} from 'components/themedLayout';

import { OrganizationCreate, OrganizationEdit, OrganizationList, OrganizationShow } from 'pages/organizations';

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
                            dataProvider={dataProvider(API_URL, axiosInstance)}
                            // dataProvider={dataProvider(
                            //     "https://api.fake-rest.refine.dev",
                            // )}
                            routerProvider={routerBindings}
                            i18nProvider={i18nProvider}
                            authProvider={authProvider(axiosInstance)}
                            options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                }}
                            notificationProvider={notificationProvider}
                            resources={[
                                // {
                                //     name: "blog_posts",
                                //     list: "/blog-posts",
                                //     show: "/blog-posts/show/:id",
                                //     create: "/blog-posts/create",
                                //     edit: "/blog-posts/edit/:id",
                                // },
                                {
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
                                {/* маршрутизация для страницы логина   */}
                                <Route
                                        element={
                                            <Authenticated fallback={<Outlet/>}>
                                                <NavigateToResource />
                                            </Authenticated>
                                        }
                                    >
                                        <Route
                                            path="/login"
                                            element={<AuthPage type="login" />}
                                        />
                                    </Route>
                                <Route element={
                                    <Authenticated 
                                        redirectOnFail={"/login"}
                                    >
                                     {/* <ThemedLayoutV2 
                                        Header={ThemedHeaderV2}
                                        Title={ThemedTitleV2}
                                        Sider={ThemedSiderV2}
                                     >
                                        <Outlet />
                                     </ThemedLayoutV2> */}
                                     <ThemedLayoutV2 
                                        Header={Header}
                                        Title={Title}
                                        Sider={Sider}
                                     >
                                        <Outlet />
                                     </ThemedLayoutV2>
                                        {/* <Layout
                                            Header={Header}
                                            Title={Title}
                                            Sider={Sider}
                                            OffLayoutArea={OffLayoutArea}
                                        >
                                            <Outlet/>
                                        </Layout> */}
                                    </Authenticated>}
                                >
                                    {/* <Route index element={<NavigateToResource resource="blog_posts" />} /> */}
                                    {/* <Route path="blog-posts">
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
                                    </Route> */}
                                    <Route path="admin/users">
                                        <Route index element={<UserList />} />
                                        <Route
                                            path="show/:id"
                                            element={<MuiInferencer />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<UserEdit />}
                                            //element={<MuiInferencer />}
                                        />
                                        <Route
                                            path="create"
                                            element={<MuiInferencer />}
                                        />
                                    </Route>
                                    <Route path="settings/organizations">
                                        <Route index element={<OrganizationList />} />
                                        <Route
                                            path="show/:id"
                                            element={<OrganizationShow />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<OrganizationEdit />}
                                        />
                                        <Route
                                            path="create"
                                            element={<OrganizationCreate />}
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
