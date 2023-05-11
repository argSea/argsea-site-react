import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";
import Home from "./pages/home/Home";
import Portfolio from "./pages/portfolio/Portfolio";
import Resume from "./pages/resume/Resume";
import Header from "./template/Header";
import Hero from "./template/Hero";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";

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
      <div id="abscanvas">
        {/* <Canvas>
          <Stars factor={1} fade={false} count={500} depth={2} />
        </Canvas> */}
      </div>
      <div>
        <BrowserRouter>
          <Hero user={user} />
          <Header />
          <div id="content">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/admin" element={<Home user={user} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
