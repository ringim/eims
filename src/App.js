// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import { UserAuthContextProvider } from "./context";
import { useStore } from "./store";
import Alert from './utils/alert'
// ----------------------------------------------------------------------

export default function App() {
  const notify = useStore(state => state?.notify)
  const setNotify = useStore(state => state?.setNotify)
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <UserAuthContextProvider>
        <Alert notify={notify} setNotify={setNotify}/>
        <Router />
      </UserAuthContextProvider>
    </ThemeProvider>
  );
}
