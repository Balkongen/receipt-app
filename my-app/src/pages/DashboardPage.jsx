import ButtonBar from "../components/ButtonBar";
import DashboardComponent from "../components/DasboardComponent";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]); // When user logs in/is authenticated it gets redirected

  return (
    <div>
      <Navbar/>
      <DashboardComponent></DashboardComponent>
    </div>
  );
}
