import "./App.css";
import Profile from "./components/Profile";
import ButtonBar from "./components/ButtonBar";

import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserPage from "./pages/UserPage";

import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Routes>
      {/* <Route path="/" element={isAuthenticated ? <DashboardPage /> : <HomePage />} /> */}
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/user" element={<UserPage/>}/>
      <Route path="/*" element={<NotFoundPage/>} />
    </Routes>
  );
}

export default App;
