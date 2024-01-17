import React, { useEffect, useState } from "react";
import iUser from "../interfaces/iUser";
import DOMPurify from "dompurify";
import iProject from "../interfaces/iProject";
import API from "../lib/API";

// create usercontext and provider
export const UserContext = React.createContext({});

export const UserProvider = (props: any) => {
  const [user, setUser] = useState<iUser>();

  var userID = "6396d88feafa14a262f9915c";
  const userAPIURL = API.BASE_URL + API.GET_USER.replace("{id}", userID);
  const projectsAPIURL = API.BASE_URL + API.GET_USER_PROJECTS.replace("{id}", userID);

  const userAPI = fetch(userAPIURL);
  const projectsAPI = fetch(projectsAPIURL);

  useEffect(() => {
    // setLoading(true);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    Promise.all([userAPI, projectsAPI])
      .then((values) => {
        return Promise.all(values.map((r) => r.json()));
      })
      .then((data) => {
        console.log(data);
        let user = data[0];
        user.about = DOMPurify.sanitize(user.about);
        // user.projects = data[1] as iProject[];
        // add projects to user unless isHidden = true and sort projects by priority, higher priority being first
        user.projects = data[1]
          .filter((project: iProject) => !project.isHidden)
          .sort((a: iProject, b: iProject) => (a.priority > b.priority ? -1 : 1)) as iProject[];

        console.log(user);
        setUser(user);
        // setLoading(false);
      });
  };

  return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};
