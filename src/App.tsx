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
        <AnimatePresence>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:projectSlug" element={<SingleProject />} />
            </Routes>
          </BrowserRouter>
        </AnimatePresence>
      </UserProvider>
    </>
  );
}

export default App;
