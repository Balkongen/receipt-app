import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Buttons/LogoutButton";
import UserButton from "./Buttons/UserButton";
import LoginButton from "./Buttons/LoginButton";

export default function LoggedInButtonBar() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="flex flex-row">
        <LogoutButton></LogoutButton> <UserButton></UserButton>
      </div>
    );
  }

  return <LoginButton></LoginButton>
}
