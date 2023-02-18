// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import { UserAuthContextProvider } from "./context";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <UserAuthContextProvider>
        <Router />
      </UserAuthContextProvider>
    </ThemeProvider>
  );
}
