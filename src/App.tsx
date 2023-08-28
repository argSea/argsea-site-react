import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./template/Header";
import Hero from "./template/Hero";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Interests from "./template/Interests";
import iInterests from "./interfaces/Interests";
import Portfolio from "./pages/home/sections/Portfolio/Portfolio";

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
}

function App() {
  const [user, setUser] = useState<iUser>({
    userID: "user1",
    userName: "user1",
    firstName: "Justin",
    lastName: "Smith",
    email: "blahlbah@blah.com",
    title: "Someone",
    picture: "nothing.jpg",
    about: "Me",
    techInterests: [
      { name: "Python", icon: "/icons/python.png", interestLevel: 10 },
      { name: "C++", icon: "/icons/cplus.png", interestLevel: 10 },
    ],
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

  //stall until user is loaded
  if (user.userID === "user1") {
    return <div></div>;
  }

  return (
    <>
      <div id="abscanvas">
        <Canvas>
          <Stars factor={1} fade={false} count={500} depth={2} />
        </Canvas>
      </div>
      <BrowserRouter>
        <Hero user={user} />
        <Header />
        <div id="content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
          </Routes>
        </div>
        <Interests interests={user.techInterests} />
      </BrowserRouter>
    </>
  );
}

export default App;
