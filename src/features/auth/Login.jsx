import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authSlice";
import shapeImage from './../../assets/Shape.png';
import { loginApi } from "../../utils/apis/auth";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleChange = (event) => {
    setRememberPassword(event.target.checked);
  };

  const validate = () => {
    const newErrors = {};

    if (!email || !password) {
      if (!email) newErrors.email = t("Please enter Email ID");
      if (!password) newErrors.password = t("Please enter your Password");
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

    const response = await loginApi(email, password);

    if (response?.id) {
      let token = `${response.id}-${response.username}`;
      dispatch(
        login({
          token: token,
          email: response.email,
          username: response.username,
          role: "Admin",
        })
      );
      localStorage.setItem("access_token", token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          isAuthenticated: true,
          token: token,
          email: response.email,
          role: "Admin",
          username: response.username,
        })
      );
      navigate("/dashboard");
    } else {
      toast.error(t("Email ID/Password incorrect!"));
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
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
        }}
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
            {t("Login to Account")}
          </Typography>
          <Typography fontSize={14} fontWeight={400} color={"#393939"}>
            {t("Please enter your email and password to continue")}
          </Typography>
        </Box>

        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={onHandleSubmit}
        >
          <Box mb={4}>
            <FormControl
              fullWidth
              error={Boolean(errors.email)}
              margin="normal"
            >
              <FormLabel style={{ fontWeight: 600 }}>
                {t("Email Address:")}
              </FormLabel>
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

            <FormControl
              fullWidth
              error={Boolean(errors.password)}
              margin="normal"
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <FormLabel style={{ fontWeight: 600 }}>
                  {t("Password")}
                </FormLabel>
                <Button
                  component={ReactRouterLink}
                  to="/forgot-password"
                  sx={{
                    textAlign: "right",
                    textTransform: "capitalize",
                    color: "secondary.text",
                    mt: 1,
                    fontSize: 14,
                  }}
                >
                  {t("Forget Password?")}
                </Button>
              </Box>
              <TextField
                type={"password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="●●●●●●"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberPassword}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={t("Remember Password")}
            />
          </Box>

          <Button
            type="submit"
            sx={{
              width: "418px",
              height: "56px",
              margin: "0 auto",
              background: "#4880FF",
            }}
            variant="contained"
            color="primary"
            disabled={loader}
            startIcon={loader ? <CircularProgress size={24} /> : null}
          >
            {loader ? t("Logging in..") : t("Login")}
          </Button>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            {t("Don’t have an account?")}{" "}
            <Button
              component={ReactRouterLink}
              to="/sign-up"
              sx={{
                textAlign: "right",
                textTransform: "capitalize",
                color: "#5A8CFF",
                fontSize: 14,
              }}
            >
              {t("Create Account")}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
