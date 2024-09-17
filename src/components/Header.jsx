import React from 'react';
import { useThemeContext } from '../context/ThemeContext';
import { AppBar, Toolbar, IconButton, InputBase, Box, Avatar, Badge, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationIcon from './../assets/notificationIcon.png';
import UKFlag from './../assets/UKFlag.png';
import NightIcon from './../assets/NightIcon.png';
import LightIcon from './../assets/LightIcon.png';
import LanguageSelect from './LanguageSelect';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Header = ({ setShow }) => {
  const { t } = useTranslation()
  const { darkMode, toggleTheme } = useThemeContext();
  const { username, role } = useSelector((state) => state.auth);  

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => setShow(prev => !prev)}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '20px', border: '1px solid #D5D5D5', width: '388px' }}>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <InputBase placeholder={t("Search")} sx={{ ml: 1, flex: 1 }} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <img src={NotificationIcon} alt="Notification Icon" />
            </Badge>
          </IconButton>
          <IconButton>
            <img src={UKFlag} alt="UK Flag" />
            <LanguageSelect />
          </IconButton>
          <Box display="flex" alignItems="center">
            <Avatar alt="User" src="/path/to/avatar.jpg" />
            <Box ml="10px">
              <Typography fontSize="14px" fontWeight={700} textTransform="capitalize">
                {username}
              </Typography>
              <Typography fontSize="12px" fontWeight={600} color="#565656">
                {role}
              </Typography>
            </Box>
          </Box>
          <IconButton color="inherit" onClick={toggleTheme}>
            <img src={darkMode ? LightIcon : NightIcon} alt={darkMode ? 'Light Theme Icon' : 'Dark Theme Icon'} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
