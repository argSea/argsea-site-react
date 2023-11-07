import iTechInterest from "./iTechInterest";
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
  techInterests: iTechInterest[];
  projects: iProject[];
  contacts: iContacts[];
}

export default iUser;
