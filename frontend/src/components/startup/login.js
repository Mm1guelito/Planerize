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

const Login = (props) => {
  const inputProps = {
    style: {
      color: "#5B5B5B",
      background: "white",
      borderRadius: 10,
      border: "none", // Remove the solid border
    },
  };
  const navigate = useNavigate(); // Get the navigate function

  const handleLogin = () => {
    // Assuming "/main-dashboard" is the path to the MainDashboard component
    navigate("/main-dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.centered}>
        <img src={PlanerizeIcon} alt="Planerize Icon" />
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
        <Button onClick={handleLogin}>Login</Button>
      </div>
      <div>
        <span>
          Not yet a member?
          <Button onClick={props.handleSwitchRegister}>Register</Button>
        </span>
      </div>
    </div>
  );
};

export default Login;
