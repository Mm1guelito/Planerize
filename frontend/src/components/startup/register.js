import React, { useState, useRef } from "react";
import { Button, TextField } from "@mui/material";
import PlanerizeIcon from "../../static/PlanerizeIcon.png";
import { useNavigate } from "react-router-dom";
import SnackBarErrorHandling from "../snackBarErrorHandling";

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
      border: "none",
    },
  };

  const apiUrl = "http://127.0.0.1:3000";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const snackbarRef = useRef(null);

  const handleShowSnackbar = (message, severity) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
    setTimeout(() => {
      handleCloseSnackbar();
    }, 3000);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
    setMessage("");
    setSeverity("");
  };

  const handleSwitchRegister = () => {
    handleRegister();
  };

  const handleRegister = () => {
    const url = `${apiUrl}/v1/auth/register`;

    const payload = {
      name: name,
      email: email,
      password: pass,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((messageData) => {
        if (messageData.message === "User registered successfully") {
          sessionStorage.setItem("token", messageData.token);
          const token = messageData.token;
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          sessionStorage.setItem("accountName", decodedToken.name);
          sessionStorage.setItem("userId", decodedToken.userId);
          sessionStorage.setItem("email", email);
          navigate("/main-dashboard");
        } else {
          handleShowSnackbar(
            "Register failed. Please check your credentials.",
            "error"
          );
        }
      })
      .catch((error) => {
        handleShowSnackbar(
          "An error occurred while processing your request.",
          "error"
        );
        console.error("Error:", error);
      });
  };

  return (
    <div style={styles.container}>
      <SnackBarErrorHandling
        handleCloseSnackbar={handleCloseSnackbar}
        open={open}
        message={message}
        snackbarRef={snackbarRef}
        severity={severity}
      />
      <div style={styles.centered}>
        <img src={PlanerizeIcon} alt="Planerize Icon" />
      </div>
      <div style={styles.centered}>
        <TextField
          placeholder="Full Name"
          inputProps={inputProps}
          size="small"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={styles.centered}>
        <TextField
          placeholder="Email"
          inputProps={inputProps}
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={styles.centered}>
        <TextField
          placeholder="Password"
          inputProps={inputProps}
          size="small"
          onChange={(e) => setPass(e.target.value)}
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
