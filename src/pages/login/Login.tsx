import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import "./styles/login.css";
import Hero from "../../template/hero/Hero";
import Header from "../../template/header/Header";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Interests from "../../template/interests/Interests";
import iUser from "../../interfaces/iUser";
import { UserContext } from "../../contexts/UserContext";
import { LoginContext } from "../../contexts/LoginContext";
import iLoginContext from "../../interfaces/iLoginContext";
import LoginHandler from "./scripts/LoginHandler";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navi = useNavigate();
  const [user, setUser] = useContext(UserContext) as [iUser, any];
  const { regUser, login, logout } = useContext(LoginContext) as {
    regUser: iLoginContext;
    login: (new_user: iLoginContext) => void;
    logout: () => void;
  };

  console.log(user);

  useEffect(() => {
    // check if user is logged in
    if (regUser.loggedIn) {
      // redirect to admin page
      console.log("Logged in!");
      console.log(regUser);

      // redirect to admin page
      navi("/admin");
    }
  }, [regUser.loggedIn]);

  const loginUser = async () => {
    // get username
    const username = document.getElementById("username") as HTMLInputElement;
    // get password
    const password = document.getElementById("password") as HTMLInputElement;

    await LoginHandler(username.value, password.value, login);

    // clear username and password
    username.value = "";
    password.value = "";

    return false;
  };

  const forkMe = () => {
    if (!regUser.loggedIn) {
      return (
        <>
          <form>
            <div id="user-box">
              <input type="text" id="username" name="username" required={true} autoComplete="false" />
              <label>Username</label>
            </div>
            <div id="password-box">
              <input type="password" id="password" name="password" required={true} autoComplete="false" />
              <label htmlFor="password">Password</label>
            </div>
            <a id="login-submit" href="#" onClick={loginUser}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Login
            </a>
          </form>
        </>
      );
    } else {
      return (
        <>
          <form>
            <div id="user-box">Logged in as {regUser.userName}</div>
            <a id="login-submit" href="#" onClick={logout}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Logout
            </a>
          </form>
        </>
      );
    }
  };

  return (
    <>
      <section id="login">
        <Hero />
        <Header />
        <div id="abscanvas">
          <Canvas>
            <Stars factor={1} fade={false} count={500} depth={2} />
          </Canvas>
        </div>
        <div id="login-header">
          <div id="login-header-text">.login</div>
        </div>
        <div id="login-container">
          <div id="login-form">{forkMe()}</div>
        </div>
        <Interests interests={user.techInterests} />
      </section>
    </>
  );
};

export default Login;
