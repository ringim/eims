// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Box, Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
// components
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummaryAdmin.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummaryAdmin({
  title,
  total,
  percent,
  icon,
  color = "primary",
  sx,
  responses=true,
  extraInfo=true,
  ...other
}) {
  return (
    <Card
      sx={{
        p: 2,
        boxShadow: 2,
        // textAlign: "censter",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        color: (theme) => theme.palette.grey[800],
        bgcolor: (theme) => theme.palette.common.white,
        ...sx,
      }}
      {...other}
    >
     {
      extraInfo ? (<>
       {/* <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
        }}
      > */}
      <Box
        sx={{
          px: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" sx={{ opacity: 0.52 }}>
          {title}
        </Typography>
        <img src={icon} alt="icon" width={50} height={50} />
      </Box>
      {/* </StyledIcon> */}
      {responses && <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "flex-start",
          gap: 1,
          px: 4,
        }}
      >
        <Typography variant="h4" sx={{ opacity: 0.82 }}>
          {total}
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.52, fontWeight: 400 }}>
          {"Responses Collected"}
        </Typography>
      </Box>}
      <Box sx={{ px: 4, display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            background: percent < 0 ? "pink" : "skyblue",
            fontWeight: 700,
            padding: "5px 10px",
            borderRadius: 5,
          }}
          variant="body2"
        >
          {percent}%
        </Typography>
      </Box>
      </>) : (<> 
      <Box
        sx={{
          px: 4,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ opacity: 0.52 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ opacity: 0.82 }}>
          {total}
        </Typography>
      </Box>
      </>)
     }
    </Card>
  );
}
