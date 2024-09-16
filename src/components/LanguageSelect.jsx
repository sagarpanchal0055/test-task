import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

export default function LanguageSelect() {
  const { i18n } = useTranslation();
  let localLanguageStored = localStorage.getItem("curLang")
  const [language, setLanguage] = React.useState(localLanguageStored ? localLanguageStored : 'en');


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
