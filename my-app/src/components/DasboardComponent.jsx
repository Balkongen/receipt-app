import React, { useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NewUserForm from "./NewUserForm";
import ReceiptTemplateList from "./ReceiptTemplateList";
import Modal from "./Modal";
import { apiBaseUrl } from "../config/urlConfig";
import UserButton from "./Buttons/UserButton";

export default function DashboardComponent() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [isRegistered, setIsUserRegistered] = useState(false);
  const [isUserCheckLoading, setIsUserCheckLoading] = useState(true);
  const [receiptTemplates, setReceiptTemplates] = useState([]);

  useEffect(() => {
    const checkUserRegistration = async () => {
      const isUserRegistered = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${apiBaseUrl}/users`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error("Error checking status");
          }
          setIsUserRegistered(true);
        } catch (error) {
          console.error("Error checking user: ", error);
        }
      };

      if (isAuthenticated) {
        await isUserRegistered();
      }
      setIsUserCheckLoading(false);
    };
    checkUserRegistration();
  }, [isAuthenticated, getAccessTokenSilently]);

  const fetchReceiptTemplates = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${apiBaseUrl}/receipt-templates`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error fetching receipt templates");
      }
      const data = await response.json();
      setReceiptTemplates(data.receiptTemplates);
    } catch (error) {
      console.error("Error fetching receipt templates: ", error);
      setReceiptTemplates([]);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (isRegistered) {
      fetchReceiptTemplates();
    }
  }, [isRegistered, fetchReceiptTemplates]);

  const handleDialogClose = () => {
    fetchReceiptTemplates();
  };

  if (isLoading || isUserCheckLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h3>
          Tryck på logga in-knappen för att logga in eller skapa ett konto
        </h3>
      </div>
    );
  }

  if (!isRegistered) {
    return (
      <div>
        <NewUserForm setIsUserRegistered={setIsUserRegistered} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2 className="">Kvittomallar</h2>
      </div>
      <div className="flex flex-row text-center border">
        <div className="border" />
        <div>
          <ReceiptTemplateList
            templates={receiptTemplates}
            fetchReceiptTemplates={fetchReceiptTemplates}
          />
        </div>
      </div>
      <div>
        <Modal
          onClose={handleDialogClose}
          fetchReceiptTemplates={fetchReceiptTemplates}
        />
      </div>
    </div>
  );
}
