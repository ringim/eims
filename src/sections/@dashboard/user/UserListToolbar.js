import PropTypes from "prop-types";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  Box,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
// component
import Iconify from "../../../components/iconify";
import Select from "react-select";
import ErrorMessage from "src/utils/errorMessage";
import SelectStyling from "src/utils/selectStyling";
import { ORGANIZATIONS, ROLES, STATUS, STATES, LGAs } from "src/constants";
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 40,
  display: "flex",
  justifyContent: "space-between",
  alignItems: 'center',
  padding: theme.spacing(0, 1, 0, 3),
  background: "#F9FAFB",
}));

const StyledFiltersbar = styled(Toolbar)(({ theme }) => ({
  height: 26,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
  background: "#F9FAFB",
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  height: 40,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  handleFilterSurveys = () => {}
}) {
  const [org, setOrg] = useState(null);
  useEffect(() => {
    handleFilterSurveys(org)
  }, [org])
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {/* {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : ( */}
      {/* <StyledFiltersbar>
        <Box>Approved</Box>
        <Box>Reviewed</Box>
        <Box>Rejected</Box>
      </StyledFiltersbar> */}
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder="Search..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "text.disabled", width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />
      {window.location.pathname === '/submission' && <Box sx={{ width: "20%", height: '40px'}}>
        <Select
          name="organization"
          placeholder="Filter By"
          isClearable
          options={ORGANIZATIONS?.map((item) => ({
            label: item.label,
            value: item.value,
          }))}
          styles={SelectStyling}
          // components={{
          //   IndicatorSeparator: () => null,
          // }}
          value={
            org
              ? ORGANIZATIONS?.find(
                  (item) => item?.value === org
                )
              : null
          }
          // onBlur={handleBlur}
          onChange={(e) => {
            setOrg(e?.value);
          }}
        />
      </Box>}
      {/* )} */}
      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )} */}
    </StyledRoot>
  );
}
