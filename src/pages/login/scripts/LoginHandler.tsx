import React from "react";

// get username and password from form
const LoginHandler = ({ username: username }: { username: string }, { password: password }: { password: string }) => {
  // send username and password to api
  fetch("https://api.argsea.com/1/login/", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    // get response from api
    .then((response) => response.json())

    // log response
    .then((data) => console.log(data))

    // catch errors
    .catch((error) => console.log(error));
};

export default LoginHandler;
