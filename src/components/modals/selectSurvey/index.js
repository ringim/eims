import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ATMClientSurvey from "../atmClientSurvey";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 672,
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: 2,
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

function SelectSurvey(props) {
  const { isOpen, handleClose } = props;
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(!open);
  return (
    <div>
      <ATMClientSurvey isOpen={open} handleClose={toggleModal} />
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              background: "#2C3F8D",
              display: "flex",
              gap: 2,
              alignItems: "center",
              borderRadius: 2,
              p: "18px 24px",
              color: "white",
            }}
          >
            <img
              src={require("../../../assets/icons/survey.png")}
              alt="survey"
            />
            <Box>
              <Typography component="h3" fontSize="26px" fontWeight={700}>
                Start a Survey
              </Typography>
              <Typography fontSize="16px">
                Choose one of the survey template options below, So you can
                continue to fill out the survey.
              </Typography>
            </Box>
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h3"
            sx={{ marginTop: 2 }}
          >
            Survey Template Categories
          </Typography>
          {/* tempaltes */}
          <Box sx={{ marginTop: 2 }}>
            <Box
              sx={{
                background: "#F2F5FF",
                display: "flex",
                gap: "18px",
                alignItems: "center",
                padding: "18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                toggleModal();
                handleClose();
              }}
            >
              <img
                src={require("../../../assets/icons/template.png")}
                alt="template"
                width="31px"
                height="36px"
              />
              <Typography component="h4" fontSize="18px" fontWeight="700">
                ATM Client Exist Interview Survey
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default SelectSurvey;
