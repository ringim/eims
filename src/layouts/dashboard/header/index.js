import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// components
import Iconify from "../../../components/iconify";
//
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
import LanguagePopover from "./LanguagePopover";
import NotificationsPopover from "./NotificationsPopover";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 64;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const [display, setDisplay] = useState("block");

  // Online state
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    if (isOnline) {
      setDisplay("none");
    } else {
      setDisplay("block");
    }

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box
          sx={{
            display: display,
            background: isOnline ? "green" : "#6e0000",
            width: "100%",
            height: 40,
            marginTop: "-20px",
          }}
        >
          <Typography
            sx={{ color: "white", textAlign: "center", fontSize: "25px" }}
          >
            {isOnline ? "Connected!" : "⚠️ No Internet!"}
          </Typography>
        </Box>

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}
          {/* <AccountPopover /> */}
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
