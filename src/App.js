// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import { UserAuthContextProvider } from "./context";
import { useStore } from "./store";
// ----------------------------------------------------------------------

export default function App() {
  console.log(
    "-----------GEtting func from store: ",
    useStore((state) => state?.getSurveys)
  );
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
