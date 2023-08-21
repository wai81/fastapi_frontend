import {indigo, neutral} from "./colors";
import {alpha} from "@mui/material/styles";
import {DarkTheme} from "@refinedev/mui";

export const overridedDarkTheme = {
    ...DarkTheme,
    palette: {
        ...DarkTheme.palette,
        // primary: {
        //   main: "#1976d2",
        //   contrastText: "#fff",
        // },
        primary: indigo,
        secondary: {
            main: "#1C2536",
            contrastText: "#fff",
        },
        background: {
            default: '#000',
            paper: '#1C2536'
        },
        // background: {
        //   default: "#545457",
        //   paper: "#1C2536",
        // },
        success: {
            main: "#67be23",
            contrastText: "#fff",
        },
        error: {
            main: "#ee2a1e",
            contrastText: "#fff",
        },
        warning: {
            main: "#fa8c16",
            contrastText: "#fff",
        },
        info: {
            main: "#1890ff",
            contrastText: "#fff",
        },
        divider: "rgba(72,72,72,0)",
        text: {
            primary: neutral[100],
            secondary: neutral[400],
            disabled: alpha(neutral[100], 0.38)
        },
        // text: {
        //   primary: "#fff",
        //   secondary: "rgba(255,255,255,0.7)",
        //   disabled: "#d1d1d1",
        // },
    }
}