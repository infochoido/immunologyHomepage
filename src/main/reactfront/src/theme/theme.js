import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// 테마 생성
const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans", sans-serif', // Noto Sans 폰트 적용
  },
});

export default theme;
