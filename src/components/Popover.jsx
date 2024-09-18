import { Popover as PopOver } from '@mui/material';
import React from 'react'

const Popover = ({ id, open, anchorEl, onClose, children }) => (
  <PopOver
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
  >
    {children}
  </PopOver>
);

export default Popover