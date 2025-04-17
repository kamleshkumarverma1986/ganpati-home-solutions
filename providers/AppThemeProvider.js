"use client";

import { createContext, useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeModeContext = createContext({ toggleThemeMode: () => {} });

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "rgb(240 242 245)",
          },
        }
      : {}),
  },
});

export const AppThemeProvider = (props) => {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const colorMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => {
          return prevMode === "light" ? "dark" : "light";
        });
      },
    }),
    []
  );

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
