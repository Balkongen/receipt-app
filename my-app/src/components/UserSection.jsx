import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useCallback } from "react";
import { apiBaseUrl } from "../config/urlConfig";

export default function UserSection() {
  const [userInfo, setUserInfo] = useState(null);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const getUserInfo = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiBaseUrl}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Error checking status: ${response.statusText}`);
      }

      const data = await response.json();

      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated) {
      getUserInfo();
    }
  }, [isAuthenticated, getUserInfo]);

  return (
    <div className="p-1">
      <h3>Användare</h3>
      <hr />
      {userInfo ? (
        <>
          <p>Företagsnamn: {userInfo.name}</p>
          <p>Orgnummer: {userInfo.org_number}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
