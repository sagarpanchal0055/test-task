import { Button } from "@mui/material";
import React from "react";

function CustomButton({ children, onClick, type = "button" }) {
  return (
    <Button
      sx={{
        minHeight: "48px",
        background: "#4379EE",
        fontSize: "14px",
        fontWeight: "700",
        textTransform: "capitalize",
        padding: "10px 20px",
      }}
      type={type}
      variant="contained"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
