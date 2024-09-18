import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import AvTimerRoundedIcon from "@mui/icons-material/AvTimerRounded";
import { logout } from "../../store/auth/authSlice";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../context/ThemeContext";

const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { darkMode } = useThemeContext()

  const menuItems = [
    { name: t("Dashboard"), path: "/dashboard", Icon: AvTimerRoundedIcon },
    { name: t("Projects"), path: "/projects", Icon: DashboardIcon },
    { name: t("Estimates"), path: "/estimates", Icon: LocalAtmRoundedIcon },
    { name: t("Logout"), path: "/login", Icon: LogoutIcon },
  ];

  const topMenuItems = menuItems.slice(0, -1);
  const bottomMenuItems = menuItems.slice(-1);

  return (
    <Box
      sx={{
        bgcolor:"background.paper",
        minWidth: 250,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: `1px solid ${darkMode ? "transparent" : "#E0E0E0"}`,
      }}
    >
      <Box>
        <Box sx={{ padding: 2, textAlign: "center" }}>
          <Box
            fontSize={"20px"}
            fontWeight={800}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            LO
            <Typography fontSize={"20px"} color="#4379ee" fontWeight={800}>
              GO
            </Typography>
          </Box>
        </Box>
        <List>
          {topMenuItems.map(({ path, name, Icon }, index) => (
            <ListItem
              component={NavLink}
              to={path}
              key={index}
              sx={{
                position: "relative",
                "&:hover" : {
                  "background": darkMode ? "#483D8B" : "lightGrey"
                }
              }}
            >
              <Box
                width={"5px"}
                height={"64px"}
                position={"absolute"}
                left={0}
                sx={{
                  backgroundColor: location.pathname.includes(path) ? "#4C8BF5" : "",
                  borderTopRightRadius: location.pathname.includes(path) ? "4px" : "",
                  borderBottomRightRadius:
                    location.pathname.includes(path) ? "4px" : "",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  width: "180px",
                  alignItems: "center",
                  marginLeft: "16px",
                  backgroundColor: location.pathname.includes(path) ? "#4C8BF5" : "",
                  borderRadius: location.pathname.includes(path) ? "4px" : "",
                  p: "16px",
                  pr: "24px",
                }}
              >
                <ListItemIcon>
                  <Icon
                    sx={{
                      color: location.pathname.includes(path) ? "white" : "secondary.text",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        color: location.pathname.includes(path) ? "white" : "secondary.text",
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

      <List sx={{ borderTop: `1px solid ${darkMode ? "#E0E0E0" : "transparent"}`, pt: "16px" }}>
        {bottomMenuItems.map(({ path, name, Icon }, index) => (
          <ListItem
            component={NavLink}
            to={path}
            key={index}
            onClick={() => {
              if (name === t("Logout")) {
                dispatch(logout());
              }
            }}
            sx={{
              backgroundColor: location.pathname.includes(path) ? "#4C8BF5" : "",
              borderRadius: location.pathname.includes(path) ? "4px" : "",
              marginBottom: "8px",
              paddingLeft: "16px",
            }}
          >
            <ListItemIcon>
              <Icon
                sx={{ color: location.pathname.includes(path) ? "white" : "secondary.text" }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    color: location.pathname.includes(path) ? "white" : "secondary.text",
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
