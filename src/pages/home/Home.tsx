import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import HTMLReactParser from "html-react-parser";
import { Canvas, extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Audiowide from "../../assets/audiowide.json";
import { Vector3 } from "three";

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

interface iProject {
  projectID: string;
  userIDs: string[];
  projectType: string;
  name: string;
  shortName: string;
  icon: string;
  slug: string;
  repoURL: string;
  description: string;
  skills: string[];
  roles: string[];
  priority: number;
  isActive: boolean;
  isReleased: boolean;
  bookID: string;
  relatedCourse: string;
  relatedExperience: [];
  links: string[];
  snippets: string[];
  features: string[];
}

extend({ TextGeometry });

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

  const [project, setProject] = useState<iProject>({
    projectID: "project1",
    userIDs: ["userID1"],
    projectType: "type1",
    name: "Project1",
    shortName: "Project1",
    icon: "/defaulticon.png",
    slug: "project-1",
    repoURL: "github.com",
    description: "Description",
    skills: ["C++"],
    roles: ["Sole Contributor"],
    priority: 10,
    isActive: false,
    isReleased: false,
    bookID: "bookID1",
    relatedCourse: "",
    relatedExperience: [],
    links: ["argsea.com"],
    snippets: ["Snippet1"],
    features: ["Feature1"],
  });

  const font = new FontLoader().parse(Audiowide);

  const aboutMeOpts = {
    font,
    size: 32,
    height: 0.1,
  };
  const portfolioOpts = {
    font,
    size: 32,
    height: 0.1,
  };

  const aboutMePos = new Vector3(-125, -10, -50);
  const portfolioPos = new Vector3(-125, -10, -50);

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
        {/* <div id="picture">
          <img src={user.picture} />
        </div> */}
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
        <Canvas style={{ width: "100%", height: "100px" }}>
          <mesh position={aboutMePos}>
            <textGeometry args={["About Me", aboutMeOpts]} />
          </mesh>
        </Canvas>
        <div>{HTMLReactParser(user.about)}</div>
        <br></br>
        <div>{HTMLReactParser(user.about)}</div>
        <br></br>
        <div>{HTMLReactParser(user.about)}</div>
        <br></br>
        <div>{HTMLReactParser(user.about)}</div>
        <br></br>
      </section>
      <section id="portfolio">
        <Canvas style={{ width: "100%", height: "100px" }}>
          <mesh position={portfolioPos}>
            <textGeometry args={["Portfolio", portfolioOpts]} />
          </mesh>
        </Canvas>
        <div></div>
      </section>
    </>
  );
};

export default Home;
