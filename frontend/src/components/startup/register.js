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
  return (
    <div style={styles.container}>
      <div style={styles.centered}>
        <TextField placeholder="Email" />
      </div>
      <div style={styles.centered}>
        <TextField placeholder="Password" />
      </div>
      <div>
        <Button>Register</Button>
      </div>
    </div>
  );
};

export default Register;
