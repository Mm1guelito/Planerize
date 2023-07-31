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

const Login = (props) => {
  const inputProps = {
    style: {
      color: "#5B5B5B",
      background: "white",
      borderRadius: 10,
      border: "none",
    },
  };

  const apiUrl = "http://127.0.0.1:3000";
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
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

  const navigate = useNavigate();

  const handleLogin = () => {
    const url = `${apiUrl}/v1/auth/login`;

    const payload = {
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
        if (messageData.message === "User login successful") {
          sessionStorage.setItem("token", messageData.token);
          const token = messageData.token;
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          sessionStorage.setItem("accountName", decodedToken.name);
          sessionStorage.setItem("userId", decodedToken.userId);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem(
            "nameAcronym",
            decodedToken.name
              .split(" ")
              .map((word) => word.charAt(0))
              .join("")
          );
          navigate("/main-dashboard");
        } else {
          handleShowSnackbar(
            "Login failed. Please check your credentials.",
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
          value={email}
          placeholder="Email"
          inputProps={inputProps}
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={styles.centered}>
        <TextField
          value={pass}
          placeholder="Password"
          inputProps={inputProps}
          type={"password"}
          size="small"
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div>
        <Button
          style={{
            backgroundColor: "#58C1A8",
            color: "black",
            fontWeight: "bold",
            textTransform: "none",
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
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
