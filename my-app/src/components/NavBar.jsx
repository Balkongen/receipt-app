import ButtonBar from "./ButtonBar";
import HomeButton from "./Buttons/HomeButton";
import LoginButton from "./Buttons/LoginButton";
import LogoutButton from "./Buttons/LogoutButton";
import UserButton from "./Buttons/UserButton";
import { useAuth0 } from "@auth0/auth0-react";
import LoggedInButtonBar from "./LoggedInButtonBar";

export default function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="sticky h-16 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-sm transition-all">
      {/* <MaxWidthWrapper> */}
      <div className="flex h-16 items-center justify-between ml-10 mr-10">
        {" "}
        {/* Change margin together with text */}
        <div className="flex items-center justify-center gap-14">
          <div className="flex z-40 font-bold text-lg">
            <HomeButton></HomeButton>
          </div>

          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-14">
            <div className="font-semibold hover:underline hover:underline-offset-1">
              Demo
            </div>
            <div className="font-semibold hover:underline hover:underline-offset-1">
              ABOUT
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-1.5">
          <LoggedInButtonBar></LoggedInButtonBar>
        </div>
      </div>
      {/* </MaxWidthWrapper> */}
    </nav>
  );
}
