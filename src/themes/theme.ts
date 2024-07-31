// styles/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#2196f3", // Azul intenso
    },
    secondary: {
      main: "#ff4081", // Rosa vibrante
    },
    text: {
      primary: "#e0e0e0", // Gris claro
      secondary: "#b0b0b0", // Gris medio
    },
    divider: "#333333", // Gris más oscuro para los bordes
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem", // Ajusta el tamaño según tus necesidades
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.15rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "0.95rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
  },
});

export default theme;
