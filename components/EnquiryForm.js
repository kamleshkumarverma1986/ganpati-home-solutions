"use client";

import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import { addEnquiry } from "@/action";
import FormSubmitButton from "./FormSubmitButton";
import AlertBox from "./AlertBox";

export default function EnquiryForm() {
  const formRef = React.useRef(null);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState(null);

  const [selectedClass, setSelectedClass] = React.useState("");
  const [selectedBoard, setSelectedBoard] = React.useState("");
  const [selectedGoal, setSelectedGoal] = React.useState("");

  const classes = [
    "Electrical",
    "Plumbing",
    "Cleaning",
    "Carpentry",
    "Interior",
    "Other",
  ];

  const formReset = () => {
    formRef?.current?.reset();
    setSelectedClass("");
    setSelectedBoard("");
    setSelectedGoal("");
  };

  const formSubmitAction = async (formData) => {
    const state = await addEnquiry(formData);
    setAlertProps(state);
    setIsAlertOpen(true);
    if (state?.isSuccess) {
      formReset();
    }
  };

  return (
    <Container id="enquiry-form">
      <Paper
        square
        variant="outlined"
        sx={{ padding: { xs: "20px", md: "30px" } }}
      >
        <Typography variant="h4" sx={{ mb: "20px", mt: "25px" }}>
          Enquiry Form!
        </Typography>
        <form ref={formRef} action={formSubmitAction}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="fullName"
                    label="Full Name"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="mobileNumber"
                    label="Mobile Number"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="standard"
                    id="mobileNumber"
                    type="number"
                    inputProps={{
                      inputMode: "numeric",
                      onInput: (e) =>
                        (e.target.value = e.target.value.slice(0, 10)),
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
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="address"
                    label="Address"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="standard"
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small" variant="standard">
                    <InputLabel id="currentClassId">Service</InputLabel>
                    <Select
                      labelId="currentClassId"
                      name="currentClass"
                      label="Service"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      required
                    >
                      <MenuItem value={""}>Select Option</MenuItem>
                      {classes.map((className, index) => (
                        <MenuItem key={index} value={className}>
                          {className}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormSubmitButton />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <AlertBox
        isOpen={isAlertOpen}
        handleClose={() => setIsAlertOpen(false)}
        {...alertProps}
      />
    </Container>
  );
}
