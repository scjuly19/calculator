import React from "react";

export const themes = {
    light: {
      color: "black",
      background: "white"
    },
    dark: {
      color: "white",
      background: "#222222",
    },
  };
  
  export const ThemeContext = React.createContext(
    themes.dark // default value
  );