import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authSlice";
import shapeImage from './../../assets/Shape.png';
import { forgotPassword, loginApi } from "../../utils/apis/auth";
import { t } from "i18next";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleChange = (event) => {
    setRememberPassword(event.target.checked);
  };

  const validate = () => {
    const newErrors = {};

    if (!email || !password) {
      if (!email) newErrors.email = "Please enter Email ID";
      if (!password) newErrors.password = "Please enter your Password";
    } else {
      newErrors.email = "";
      newErrors.password = "";
    }
    return newErrors;
  };

  useEffect(() => {
    if (errors.email && email) {
      setErrors((prev) => ({ ...prev, email: null }));
    }
    if (errors.password && password) {
      setErrors((prev) => ({ ...prev, password: null }));
    }
  }, [errors, email, password]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    setLoader(true);

    const response = await forgotPassword(email, password);
    console.log("response after", response);
    
    if (response?.data?.id) {
      toast.success("Password updated successfully");
      navigate("/login");
    } else {
      toast.error("Email ID/Password incorrect!");
    }

    setLoader(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width={"100vw"}
      bgcolor={"#4880FF"}
    >
      <img
        src={shapeImage}
        alt="home-page-left-design-logo"
        style={{ width: "100%", height:"100%", position: "absolute", zIndex: 0, top: 0, left: 0 }}
      />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxWidth="630px"
        bgcolor={"white"}
        height={"735px"}
        borderRadius={"16px"}
        p={"40px"}
        zIndex={1}
      >
        <Box mb={5} textAlign={"center"}>
          <Typography fontSize={"32px"} fontWeight={700}>
            {"Forget Password"}
          </Typography>
          <Typography fontSize={14} fontWeight={400} color={"#393939"}>
            Please enter your email and password to Change Password
          </Typography>
        </Box>

        <form style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={onHandleSubmit}>
          <Box mb={4}>
            <FormControl fullWidth error={Boolean(errors.email)} margin="normal">
              <FormLabel style={{ fontWeight: 600 }}>Email Address:</FormLabel>
              <TextField
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="esteban_schiller@gmail.com"
                autoComplete="off"
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </FormControl>

            <FormControl fullWidth error={Boolean(errors.password)} margin="normal">
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <FormLabel style={{ fontWeight: 600 }}>Password</FormLabel>
              </Box>
              <TextField
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="●●●●●●"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </FormControl>
          </Box>

          <Button
            type="submit"
            sx={{ width:"418px", height: "56px", margin: "0 auto", background: "#4880FF" }}
            variant="contained"
            color="primary"
            disabled={loader}
            startIcon={loader ? <CircularProgress size={24} /> : null}
          >
            {loader ? "Updating.." : "Update Password"}
          </Button>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            Don’t have an account?   <Button
            component={ReactRouterLink}
            to="/sign-up"
            sx={{ textAlign: "right", textTransform: "capitalize", color: "#5A8CFF", fontSize: 14 }}
          >
            Create Account
          </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
