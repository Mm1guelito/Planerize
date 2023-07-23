import React, { useState } from "react";
import Login from "./login";
import Register from "./register";

const MainStartUp = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchRegister = () => {
    setIsLogin(false);
    console.log(isLogin);
  };

  return (
    <div>
      {isLogin === true ? (
        <Login handleSwitchRegister={handleSwitchRegister} />
      ) : (
        <Register />
      )}
    </div>
  );
};

export default MainStartUp;
