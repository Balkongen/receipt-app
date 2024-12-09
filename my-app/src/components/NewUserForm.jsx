import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiBaseUrl } from "../config/urlConfig";

export default function NewUserForm({ setIsUserRegistered }) {
  const { getAccessTokenSilently } = useAuth0();

  const [companyName, setCompanyName] = useState("");
  const [orgNumber, setOrgNumber] = useState("");

  const createUser = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiBaseUrl}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: companyName,
          orgNumber: orgNumber,
        }),
      });

      if (!response.ok) {
        console.error("Error creating user");
        alert("Ett fel uppstod");
      }
      setIsUserRegistered(true);
      // Handle response
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser();
  };

  return (
    <div className="flex flex-col text-center justify-center items-center">
      <h3 className="mb-6 text-xl font-bold">
        Lägg in information om din verksamhet
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="company-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Företagsnamn
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="company-name"
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="org-number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Organisationsnummer
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="org-number"
                  id="org-number"
                  value={orgNumber}
                  onChange={(e) => setOrgNumber(e.target.value)}
                  placeholder="xxxxxx-xxxx"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <input
            type="submit"
            className="mt-1 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
}
