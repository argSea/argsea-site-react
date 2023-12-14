import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { UserProvider } from "./contexts/UserContext";
import Projects from "./pages/projects/Projects";
import SingleProject from "./pages/projects/singleProject/SingleProject";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
