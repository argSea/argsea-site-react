import iInterests from "./iInterests";
import iProject from "./iProject";

interface iUser {
  userID: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  picture: string;
  about: string;
  techInterests: iInterests[];
  projects: iProject[];
}

export default iUser;
