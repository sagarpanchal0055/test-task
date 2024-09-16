import React from 'react';
import { useThemeContext } from '../context/ThemeContext';
import { AppBar, Toolbar, IconButton, InputBase, Box, Avatar, Badge, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationIcon from "./../assets/notificationIcon.png"
import UKFlag from "./../assets/UKFlag.png"
import NightIcon from "./../assets/NightIcon.png";
import LightIcon from "./../assets/LightIcon.png";
import LanguageSelect from './LanguageSelect';
import { useSelector } from 'react-redux';

const Header = () => {
  const { darkMode, toggleTheme } = useThemeContext();
  const auth = useSelector((state) => state.auth);  

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Box sx={{ width: "388px", borderRadius: "20px" }} border={"1px solid #D5D5D5"}>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <img src={NotificationIcon} alt='notification Icon' />
            </Badge>
          </IconButton>
          <IconButton>
            <img src={UKFlag} alt='notification Icon' />
            <LanguageSelect />
          </IconButton>
          <Box display={"flex"} alignItems={"center"}>
            <Avatar alt="User" src="/path/to/avatar.jpg" />
            <Box ml={"10px"}>
              <Typography fontSize={"14px"} fontWeight={700} textTransform={"capitalize"}>{auth?.username}</Typography>
              <Typography fontSize={"12px"} fontWeight={600} color='#565656'>{auth?.role}</Typography>
            </Box>
          </Box>
          <IconButton color="inherit" onClick={toggleTheme}>
            {darkMode 
              ? <img src={LightIcon} alt='Light Theme Icon' />
              : <img src={NightIcon} alt='Dark Theme Icon' />
            }
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
