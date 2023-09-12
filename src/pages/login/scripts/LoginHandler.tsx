import iLoginContext from "../../../interfaces/iLoginContext";
import API from "../../../lib/API";

const LoginHandler = async (username: string, password: string, login: any) => {
  const loginURL = API.BASE_URL + API.LOGIN;
  // send username and password to api
  return (
    fetch(loginURL, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        throw new Error("Invalid username or password");
      })
      .then((data) => {
        // log token
        console.log(data);
        const new_login: iLoginContext = {
          loggedIn: true,
          cookieName: "auth-token",
          userName: data.userName,
          userID: data.userID,
          token: data.token,
        };

        console.log(new_login);

        // set login context
        login(new_login);
        return data;
      })
      // catch errors
      .catch((error) => console.log(error))
  );
};

export default LoginHandler;
