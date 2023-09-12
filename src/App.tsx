import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { UserProvider } from "./contexts/UserContext";
import { LoginProvider } from "./contexts/LoginContext";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* login */}
            <Route path="/login" element={<Login />} />
            {/* admin */}
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
