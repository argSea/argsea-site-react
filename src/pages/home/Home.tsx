import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import HTMLReactParser from "html-react-parser";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";

interface iUser {
  userID: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  picture: string;
  about: string;
}

const Home = () => {
  const [user, setUser] = useState<iUser>({
    userID: "user1",
    userName: "user1",
    firstName: "Justin",
    lastName: "Smith",
    email: "blahlbah@blah.com",
    title: "Someone",
    picture: "nothing.jpg",
    about: "Me",
  });

  useEffect(() => {
    const getUser = async () => {
      const userFromAPI = await fetchUser();
      console.log(userFromAPI);
      setUser(userFromAPI);
    };

    getUser();
  }, []);

  const fetchUser = async () => {
    const res = await fetch("https://api.argsea.com/1/user/6396d88feafa14a262f9915c/");
    const data = await res.json();

    let user = data.users[0];
    user.about = DOMPurify.sanitize(user.about);

    return user;
  };

  return (
    <>
      <section id="bio">
        {/* <div id="userID">{user.userID}</div> */}
        {/* <div id="userName">{user.userName}</div> */}
        <div id="picture">
          <img src={user.picture} />
        </div>
        <div id="intro">Hey, I go by </div>
        <div id="name">
          {user.firstName} {user.lastName}
        </div>
        {/* <div id="email">{user.email}</div> */}
        <div id="title">
          I like to design and build things as a <span id="titleHighlight">{user.title}</span>.
        </div>
        <div id="basicme">{HTMLReactParser(user.about)}</div>
      </section>
      <section id="aboutme">
        <div>{HTMLReactParser(user.about)}</div>
        <br></br>
        <div>{HTMLReactParser(user.about)}</div>
        <br></br>
        <div>{HTMLReactParser(user.about)}</div>
        <br></br>
        <div>{HTMLReactParser(user.about)}</div>
        <br></br>
      </section>
    </>
  );
};

export default Home;
