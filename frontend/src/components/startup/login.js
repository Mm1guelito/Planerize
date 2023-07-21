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

const Login = (props) => {
  const inputProps = {
    style: {
      color: "#5B5B5B",
      background: "white",
      borderRadius: 10,
      border: "none",
    },
  };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/main-dashboard");
  };

  return (
    <div style={styles.container}>
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
