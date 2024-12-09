import SignUpButton from "../components/Buttons/SignUpButton";
import NavBar from "../components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/Buttons/LoginButton";

export default function HomePage() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]); // When user logs in/is authenticated it gets redirected

  return (
    <div>
      <NavBar></NavBar>
      <div className="col-span-1 px-2 lg:px-0 mt-20 ml-10 mr-10"> {/* Change margin together with text */}
        <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="relative w-fit tracking-tighter text-balance font-bold !leading-tight text-gray-900 text-5xl md:text-6xl">
            Skicka smidigt ut friskvårdskvitton
          </h1>
          <p className="mt-8 text-balance text-lg max-w-prose text-center font-semibold lg:pr-10 md:text-wrap lg:text-left">
            Minska tiden ni lägger på friskvårdsadministration
          </p>
        </div>
      </div>
    </div>
  );
}
