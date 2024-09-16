import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import AvTimerRoundedIcon from "@mui/icons-material/AvTimerRounded";
import { logout } from "../../store/auth/authSlice";
import { useTranslation } from "react-i18next";


const Sidebar = () => {
  const { t } = useTranslation();
  const menuItems = [
    { name: t("Dashboard"), path: "/dashboard", Icon: AvTimerRoundedIcon },
    { name: t("Projects"), path: "/projects", Icon: DashboardIcon },
    { name: t("Estimates"), path: "/estimates", Icon: LocalAtmRoundedIcon },
    { name: t("Logout"), path: "/login", Icon: LogoutIcon },
  ];

  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSubmenu = () => setIsOpen(!isOpen);

  const topMenuItems = menuItems.slice(0, menuItems.length - 1);
  const bottomMenuItems = menuItems.slice(menuItems.length - 1);

  return (
    <Box
      sx={{
        minWidth: 250,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #E0E0E0",
      }}
    >
      <Box>
        <Box sx={{ padding: 2, textAlign: "center" }}>
          <Typography
            justifyContent={"center"}
            width={"100%"}
            display={"flex"}
            fontSize={"20px"}
            fontWeight={800}
          >
            LO
            <Typography fontSize={"20px"} color="#4379ee" fontWeight={800}>
              GO
            </Typography>
          </Typography>
        </Box>
        <List>
          {topMenuItems.map(({ path, name, Icon }, index) => (
            <ListItem
              component={NavLink}
              to={path}
              key={index}
              sx={{
                position: "relative"
              }}
            >
              <Box 
                width={"5px"} 
                height={"64px"}
                position={"absolute"}
                left={0}
                sx={{ 
                  backgroundColor: location.pathname === path ? "#4C8BF5" : "",
                  borderTopRightRadius: location.pathname === path ? "4px" : "", 
                  borderBottomRightRadius: location.pathname === path ? "4px" : "", 
                }} 
              ></Box>
              <Box sx={{ 
                display: "flex", 
                width: "180px", 
                alignItems: "center", 
                marginLeft: "16px", 
                backgroundColor: location.pathname === path ? "#4C8BF5" : "",
                borderRadius: location.pathname === path ? "4px" : "",
                p: "16px",
                pr: "24px" 
              }}>
                <ListItemIcon>
                  <Icon
                    sx={{
                      color: location.pathname === path ? "white" : "black",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        color: location.pathname === path ? "white" : "black",
                        fontWeight: 600,
                      }}
                    >
                      {name}
                    </Typography>
                  }
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <List>
        {bottomMenuItems.map(({ path, name, Icon }, index) => (
          <ListItem
            button
            component={NavLink}
            to={path}
            key={index}
            onClick={() => {
              if (name === "Logout") {
                dispatch(logout());
              }
            }}
            sx={{
              backgroundColor: location.pathname === path ? "#4C8BF5" : "",
              borderRadius: location.pathname === path ? "4px" : "",
              marginBottom: "8px",
              paddingLeft: "16px",
            }}
          >
            <ListItemIcon>
              <Icon
                sx={{ color: location.pathname === path ? "white" : "black" }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    color: location.pathname === path ? "white" : "black",
                    fontWeight: 500,
                  }}
                >
                  {name}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
