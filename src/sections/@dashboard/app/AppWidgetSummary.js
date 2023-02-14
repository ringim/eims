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
        boxShadow: 0,
        // textAlign: "censter",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
        <Iconify icon={icon} width={32} height={32} />
      </Box>
      {/* </StyledIcon> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5,
        }}
      >
        <Typography variant="h3">{fShortenNumber(total)}</Typography>
        <Typography
          variant="h6"
          sx={{ border: "1px solid", px: 2, borderRadius: 5 }}
        >
          {"45.5%"}
        </Typography>
      </Box>
    </Card>
  );
}
