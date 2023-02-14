import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 1200,
  width: "100%",
  // height: "900px",
  overflow: "auto",
  bgcolor: "#E9E9E9",
  boxShadow: 24,
};

function ATMClientSurvey(props) {
  const { isOpen, handleClose } = props;
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              background: "white",
              p: "20px",
            }}
          >
            <Box
              sx={{ width: "60px", height: "60px", background: "black" }}
            ></Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize="16px" color="#4F4F4F">
                Preview Survey:
              </Typography>
              <Typography fontSize="18px" fontWeight="700" color="#4F4F4F">
                C19RM/RSSH COMMUNITY LED MONITORING IN ATM INTERVENTION
              </Typography>
            </Box>
          </Box>
          {/* survey content */}
          <Box
            sx={{
              marginTop: 4,
              width: "1000px",
              background: "white",
              borderRadius: "5px",
              margin: "20px auto",
              p: 2,
            }}
          >
            <Typography fontSize="26px" fontWeight={700} color="#4F4F4F">
              Introduction
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ATMClientSurvey;
