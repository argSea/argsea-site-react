import React, { useEffect } from "react";
import iLoginContext from "../interfaces/iLoginContext";
import API from "../lib/API";

const LoginContext = React.createContext({});

const LoginProvider = (children: any) => {
  const [regUser, setRegUser] = React.useState<iLoginContext>({
    loggedIn: false,
    cookieName: "auth-token",
    userName: "",
    userID: "",
    token: "",
  });

  useEffect(() => {
    // check if auth-token cookie exists
    const cookie = document.cookie.split(";").find((c) => c.trim().startsWith("auth-token="));

    if (!cookie) {
      console.log("No auth-token cookie found");
      return;
    }

    // check if user-details cookie exists
    const user_details_cookie = document.cookie.split(";").find((c) => c.trim().startsWith("user-details="));

    if (!user_details_cookie) {
      console.log("No user-details cookie found");
      return;
    }

    // get data
    const user_data = user_details_cookie.split("=")[1];

    // parse data
    const user_data_json = JSON.parse(user_data);

    // set login context
    setRegUser({
      loggedIn: true,
      cookieName: "auth-token",
      userName: user_data_json.userName,
      userID: user_data_json.userID,
      token: cookie.split("=")[1],
    });
  });

  useEffect(() => {
    //check if logged in using api
    const validateURL = API.BASE_URL + API.VALIDATE;
    fetch(validateURL, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        throw new Error("Not logged in");
      })
      .then((data) => {
        // set context
        let user = data.users[0];
        login({
          loggedIn: true,
          cookieName: "auth-token",
          userName: user.userName,
          userID: user.userID,
          token: "",
        });
        return data;
      })
      // catch errors
      .catch((error) => console.log(error));
  }, []);

  const logout = () => {
    setRegUser({
      loggedIn: false,
      cookieName: "auth-token",
      userName: "",
      userID: "",
      token: "",
    });

    // remove cookie
    document.cookie = `auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // redirect to home page
    window.location.href = "/";
  };

  const login = (new_user: iLoginContext) => {
    setRegUser(new_user);
    // set cookie user-details with json-encoded user data
    document.cookie = `user-details=${JSON.stringify({ new_user })}; path=/;`;
  };

  return <LoginContext.Provider value={{ regUser, login, logout }}>{children.children}</LoginContext.Provider>;
};

export { LoginContext, LoginProvider };
