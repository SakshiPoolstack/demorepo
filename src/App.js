import logo from "./logo.svg";
import "./App.css";
import Register from "./pages/Register";
import { Input } from "./component/input/Input";
import { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./component/protected/Protected";
import NavBaar from "./component/navbaar/NavBaar";
import ToDo from "./pages/ToDo";
function App() {
  const [isAuth, setIsauth] = useState(false);

  const login = () => {
    setIsauth(true);
    console.log(isAuth);
  };
  const logout = () => {
    setIsauth(false);
  };
  return (
    <div>
      <BrowserRouter>
        <NavBaar user={isAuth} logout={logout} />
        <Routes>
          <Route path="*" element={<Login setIsLogin={login} />} />
          <Route path="/" element={<Login setIsLogin={login} />} />
          <Route path="/register" element={<Register setIsLogin={login}/>} />
          <Route element={<Protected user={isAuth} />}>
            <Route path="/todo" element={<ToDo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
