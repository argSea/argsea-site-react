interface iLoginContext {
  loggedIn: boolean;
  token: string;
  userName: string;
  userID: string;
  cookieName: string;
}

export default iLoginContext;
