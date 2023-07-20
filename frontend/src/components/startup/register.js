import React from "react";
import { Button, TextField } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Set the container height to fill the viewport
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "16px", // Optional: Add some space between the text fields
  },
};

const Register = (props) => {
  const inputProps = {
    style: {
      color: "gray",
      background: "white",
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.centered}>
        <TextField placeholder="Email" inputProps={inputProps} />
      </div>
      <div style={styles.centered}>
        <TextField placeholder="Password" inputProps={inputProps} />
      </div>
      <div>
        <Button>Login</Button>
      </div>
      <div>
        <span>
          <Button onClick={props.handleSwitchRegister}>Register</Button>
        </span>
      </div>
    </div>
  );
};

export default Register;
