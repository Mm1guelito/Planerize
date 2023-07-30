import React, { useState } from "react";
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
      border: "none",
    },
  };

  const apiUrl = "http://127.0.0.1:3000";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSwitchRegister = () => {
    handleRegister();
  };

  const handleRegister = () => {
    console.log("triggered");
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
    console.log(url, requestOptions);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((messageData) => {
        console.log("payload, response", payload, messageData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
