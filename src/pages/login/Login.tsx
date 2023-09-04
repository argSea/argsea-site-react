import React, { Dispatch, SetStateAction, useContext } from "react";
import "./styles/login.css";
import Hero from "../../template/hero/Hero";
import Header from "../../template/header/Header";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Interests from "../../template/interests/Interests";
import iUser from "../../interfaces/iUser";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
  const [user, setUser] = useContext(UserContext) as [iUser, any];
  console.log(user);
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
          <div id="login-form">
            <form>
              <div id="user-box">
                <input type="text" id="username" name="username" required={true} />
                <label>Username</label>
              </div>
              <div id="password-box">
                <input type="password" id="password" name="password" required={true} />
                <label htmlFor="password">Password</label>
              </div>
              <a id="login-submit" href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Login
              </a>
            </form>
          </div>
        </div>
        <Interests interests={user.techInterests} />
      </section>
    </>
  );
};

export default Login;
