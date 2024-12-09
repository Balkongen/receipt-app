import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Buttons/LoginButton";
import LogoutButton from "./Buttons/LogoutButton";

import UserButton from "./Buttons/UserButton";
import HomeButton from "./Buttons/HomeButton";

export default function ButtonBar() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="flex flex-row border ml-auto items-center justify-between">
        <div className="flex-grow">
          <HomeButton />
        </div>
        <div className="flex-none flex space-x-2">
          <LogoutButton />
          <UserButton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row border ml-auto items-center justify-between">
      <div className="flex-grow">
        <HomeButton />
      </div>
      <div className="flex-none flex space-x-2">
        <LoginButton></LoginButton>
      </div>
    </div>
  );
}
