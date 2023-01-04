import { useEffect, useState } from "react";

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
    const res = await fetch(
      "https://api.argsea.com/1/user/6396d88feafa14a262f9915c/"
    );
    const data = await res.json();

    console.log(data);

    return data.users[0];
  };

  return (
    <>
      <div style={{ color: "white" }} id="bio">
        <div id="name">
          {user.firstName} {user.lastName}
        </div>
      </div>
    </>
  );
};

export default Home;
