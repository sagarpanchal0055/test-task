import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";
import { FormControl, FormHelperText } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [serverError, setServerError] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email) {
      if (!email) newErrors.email = "Please enter Email ID";
    } else {
      newErrors.email = "";
    }
    return newErrors;
  };

  useEffect(() => {
    if (errors.email && email) {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  }, [errors, email]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.email) {
      setErrors(validationErrors);
      return;
    }

    setLoader(true);
    let API_RESPONSE = false;
    if (API_RESPONSE) {
      console.log(email);
    } else {
      setServerError("Username is not associated.");
    }
    setLoader(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src={`${import.meta.env.PUBLIC_URL}/images/home-page-left-design.png`}
        alt="home-page-left-design-logo"
        style={{
          width: "303px",
          position: "fixed",
          zIndex: 1000,
          top: 0,
          left: 0,
        }}
      />
      <img
        src={`${import.meta.env.PUBLIC_URL}/images/home-page-right-design.png`}
        alt="home-page-right-design-logo"
        style={{
          width: "387px",
          position: "fixed",
          zIndex: 1000,
          bottom: 0,
          right: 0,
        }}
      />
      <Box />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "294px",
        }}
      >
        <Box mb={8}>
          <img
            src={`${import.meta.env.PUBLIC_URL}/images/logo.png`}
            alt="logo"
            style={{ width: "290px" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            mb: 5,
          }}
        >
          <Typography variant="h2" fontSize={32} fontWeight={700}>
            Reset password
          </Typography>
          <Typography fontSize={14} fontWeight={400} color="#393939">
            Please enter your username associated with your account.
          </Typography>
        </Box>

        <form style={{ width: "100%" }} onSubmit={onHandleSubmit}>
          <Stack width="100%" spacing={3} direction="column" mb={4}>
            <FormControl
              error={!!(serverError || errors?.email)}
              margin="normal"
            >
              <Typography fontSize={14} fontWeight={600}>
                Email ID
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Please enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  endAdornment: (serverError || errors?.email) && (
                    <InputAdornment position="end">
                      <img
                        src={`${import.meta.env.PUBLIC_URL}/images/alert-circle.png`}
                        alt="alert-circle-icon"
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "1px solid #D7D7D7",
                  },
                }}
              />
              {(serverError || errors?.email) && (
                <FormHelperText sx={{ color: "#F04438", fontSize: 14 }}>
                  {serverError || errors.email}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loader}
            sx={{
              background: "#4C8BF5",
              color: "white",
              fontWeight: 700,
              fontSize: 16,
              "&:hover": { opacity: 0.8 },
            }}
          >
            {loader ? "Submitting..." : "Submit"}
          </Button>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <MuiLink
              component={ReactRouterLink}
              to="/contact-admin"
              sx={{ color: "#4C8BF5", fontSize: 14, fontWeight: 500 }}
            >
              Contact admin
            </MuiLink>
          </Box>
        </form>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-end", pb: 4 }}>
        <Typography fontSize={12} fontWeight={400} mr={2}>
          Powered by
        </Typography>
        <img
          src={`${import.meta.env.PUBLIC_URL}/images/mounts-my.png`}
          alt="mounts-my-logo"
          style={{ width: "30px", marginRight: "8px" }}
        />
        <Typography fontSize={10} fontWeight={700}>
          MountsMy HealthCare
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
