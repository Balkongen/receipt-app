import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useCallback } from "react";
import { apiBaseUrl } from "../config/urlConfig";
import UserSection from "../components/UserSection";
import ButtonBar from "../components/ButtonBar";

export default function UserPage() {
  return (
    <div>
      <ButtonBar></ButtonBar>
      <UserSection></UserSection>
    </div>
  );
}
