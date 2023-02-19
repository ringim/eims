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

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = "primary",
  sx,
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
        <img src={icon} alt="icon" />
      </Box>
      {/* </StyledIcon> */}
      <Box
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
          {"Surveys"}
        </Typography>
      </Box>
    </Card>
  );
}
