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

function App() {
  return (
    <>
      <div id="abscanvas">
        <Canvas>
          <Stars factor={1} fade={false} count={50000} depth={2} />
        </Canvas>
      </div>
      <div>
        <BrowserRouter>
          <Hero />
          <Header />
          <div id="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/admin" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
