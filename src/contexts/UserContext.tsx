import React, { useEffect, useState } from "react";
import iUser from "../interfaces/iUser";
import DOMPurify from "dompurify";
import iProject from "../interfaces/iProject";

// create usercontext and provider
export const UserContext = React.createContext({});

export const UserProvider = (props: any) => {
  const [user, setUser] = useState<iUser>();

  const userAPI = fetch("https://api.argsea.com/1/user/6396d88feafa14a262f9915c/");
  const projectsAPI = fetch("https://api.argsea.com/1/user/6396d88feafa14a262f9915c/projects/");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    Promise.all([userAPI, projectsAPI])
      .then((values) => {
        return Promise.all(values.map((r) => r.json()));
      })
      .then((data) => {
        let user = data[0].users[0];
        user.about = DOMPurify.sanitize(user.about);
        user.projects = data[1].projects as iProject[];

        console.log(user);
        setUser(user);
      });
  };

  return (
    <UserContext.Provider value={[user, setUser]}>
      {
        // check if user is loaded, if not, show loading screen
        user ? props.children : <div>Loading...</div>
      }
    </UserContext.Provider>
  );
};
