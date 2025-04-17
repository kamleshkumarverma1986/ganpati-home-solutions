"use client";

import { useSession } from "next-auth/react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFetch } from "@/hooks/useFetch";
import { signIn } from "next-auth/react";
import Copyright from "@/components/Copyright";
import AlertBox from "@/components/AlertBox";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const initialFormData = {
  mobileNumber: "",
  otp: "",
};

export default function AdminLogin() {
  const { status } = useSession();
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState(null);

  const [sendOtp, isOtpSending, otpData, otpError] = useFetch("/api/send-otp");
  const [isLogging, setIsLogging] = React.useState(false);

  const [formData, setFormData] = React.useState(initialFormData);
  const [isOtpSent, setIsOtpSent] = React.useState(false);

  React.useEffect(() => {
    if (otpData) {
      setIsOtpSent(true);
    }
  }, [otpData]);

  React.useEffect(() => {
    if (otpError) {
      setIsAlertOpen(true);
      setAlertProps(otpError);
    }
  }, [otpError]);

  const sendOtpToMobileNumber = () => {
    sendOtp({
      method: "POST",
      body: JSON.stringify({ mobileNumber: formData.mobileNumber }),
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!isOtpSent) {
      sendOtpToMobileNumber();
    } else {
      setIsLogging(true);
      const { status } = await signIn("credentials", {
        ...formData,
        redirect: false,
        callbackUrl: "/admin-dashboard",
        redirect: false,
      });
      if (status === 401) {
        setIsAlertOpen(true);
        setAlertProps({
          isSuccess: false,
          message: "Invalid Credentials!",
        });
        setIsLogging(false);
      }
    }
  };

  const handleFormChange = (event) => {
    const data = { ...formData };
    data[event.target.name] = event.target.value;
    setFormData(data);
  };

  const onMobileNumberChangeHandler = () => {
    setFormData(initialFormData);
    setIsOtpSent(false);
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "authenticated") {
    return router.replace("admin-dashboard");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Panel Login
        </Typography>
        <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
          <TextField
            type="number"
            inputProps={{
              inputMode: "numeric",
              onInput: (e) => (e.target.value = e.target.value.slice(0, 10)),
              onChange: (e) => {
                if (e.target.value.length !== 10) {
                  e.target.setCustomValidity(
                    "Please enter valid mobile number"
                  );
                } else {
                  e.target.setCustomValidity("");
                }
              },
            }}
            margin="normal"
            required
            focused
            fullWidth
            id="mobileNumber"
            name="mobileNumber"
            label="Enter Admin Mobile Number"
            helperText="We will send OTP on your Mobile Number"
            autoComplete="mobileNumber"
            value={formData.mobileNumber}
            onChange={(event) => handleFormChange(event)}
            disabled={isOtpSent}
          />
          {isOtpSent && (
            <>
              <TextField
                type="number"
                inputProps={{
                  inputMode: "numeric",
                }}
                margin="normal"
                required
                fullWidth
                id="otp"
                label="Enter OTP"
                name="otp"
                helperText={`OTP sent to: ${formData.mobileNumber}`}
                autoComplete="otp"
                value={formData.otp}
                onChange={(event) => handleFormChange(event)}
                inputRef={(input) => input && input.focus()}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <LoadingButton
                  size="small"
                  loading={isOtpSending}
                  variant="text"
                  sx={{
                    ml: 0,
                    textTransform: "capitalize",
                    fontSize: 11,
                    p: 0,
                  }}
                  onClick={sendOtpToMobileNumber}
                >
                  Resend OTP
                </LoadingButton>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    ml: 0,
                    textTransform: "capitalize",
                    fontSize: 11,
                    p: 0,
                  }}
                  onClick={onMobileNumberChangeHandler}
                >
                  Change Mobile Number
                </Button>
              </Box>
            </>
          )}
          <LoadingButton
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLogging || isOtpSending}
          >
            {isOtpSent ? "Admin Login" : "Send OTP"}
          </LoadingButton>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <AlertBox
        isOpen={isAlertOpen}
        handleClose={() => setIsAlertOpen(false)}
        {...alertProps}
      />
    </Container>
  );
}
