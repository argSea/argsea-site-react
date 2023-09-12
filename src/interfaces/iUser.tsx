import iInterests from "./iInterests";
import iProject from "./iProject";
import iContacts from "./iContacts";

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
  contacts: iContacts[];
}

export default iUser;
