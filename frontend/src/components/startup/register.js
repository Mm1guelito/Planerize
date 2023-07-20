import React from "react";
import { Button, TextField } from "@mui/material";
import PlanerizeIcon from "../../static/PlanerizeIcon.png";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "16px",
  },
};

const Register = (props) => {
  const inputProps = {
    style: {
      color: "gray",
      background: "white",
      borderRadius: 10,
      border: "none", // Remove the solid border
    },
  };
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  // Function to handle the "Register" button click and redirect to MainDashboard
  const handleSwitchRegister = () => {
    // Assuming "/main-dashboard" is the path to the MainDashboard component
    navigate("/main-dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.centered}>
        <img src={PlanerizeIcon} alt="Planerize Icon" />
      </div>
      <div style={styles.centered}>
        <TextField
          placeholder="Full Name"
          inputProps={inputProps}
          size="small"
        />
      </div>
      <div style={styles.centered}>
        <TextField placeholder="Email" inputProps={inputProps} size="small" />
      </div>
      <div style={styles.centered}>
        <TextField
          placeholder="Password"
          inputProps={inputProps}
          size="small"
        />
      </div>

      <div>
        <span>
          <Button onClick={handleSwitchRegister}>Register</Button>
        </span>
      </div>
    </div>
  );
};

export default Register;
