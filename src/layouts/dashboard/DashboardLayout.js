import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";
import { useStore } from "src/store";
import { shallow } from "zustand/shallow";
import { collection, getDocs } from "firebase/firestore";
import { useUserAuth } from "src/context";
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 64;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { getSurveys, setLoading } = useStore(
    (state) => ({
      getSurveys: state?.getSurveys,
      setLoading: state?.setLoading,
    }),
    shallow
  );

  const { db } = useUserAuth();

  const fetchSurveys = async (db) => {
    setLoading(true);
    const data = await getDocs(collection(db, "survey"));
    return data;
  };
  useEffect(() => {
    fetchSurveys(db)
      .then((data) => {
        setLoading(false);
        const surveys = [];
        data?.forEach((doc) => {
          const fields = doc?._document?.data?.value?.mapValue?.fields;
          surveys.push({
            id: doc?.id,
            name: fields?.name?.stringValue,
            started: fields?.startedAt?.stringValue,
            submitted: fields?.submittedAt?.stringValue,
            status: fields?.status?.stringValue,
            option: null,
          });
        });
        getSurveys(surveys);
      })
      .catch((error) => {
        console.log("error: ", error);
        setLoading(false);
      });
  }, []);
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
