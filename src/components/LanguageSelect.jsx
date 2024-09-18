import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

export default function LanguageSelect({ language, setLanguage }) {
  const { i18n } = useTranslation();
  
  const handleChange = (event) => {
    setLanguage(event.target.value)
    i18n.changeLanguage(event.target.value);
    localStorage.setItem("curLang", event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Age"
          onChange={handleChange}
          sx={{
            border: 'none',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        >
          <MenuItem value={"en"}>English</MenuItem>
          <MenuItem value={"fr"}>French</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
