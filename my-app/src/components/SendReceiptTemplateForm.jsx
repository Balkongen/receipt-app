import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiBaseUrl } from "../config/urlConfig";

export default function SendReceiptTemplateForm({ receiptTemplateId }) {
  const [name, setName] = useState("");
  const [personNumber, setPersonNumber] = useState("");
  const [email, setEmail] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  const sendReceipt = async () => {
    try {
      const token = await getAccessTokenSilently();
      
      const response = await fetch(
        `${apiBaseUrl}/send-mail/${receiptTemplateId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            name: name,
            personNumber: personNumber,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error creating receiptTemplate");
        alert("Ett fel uppstod");

        return;
      } else {
        
        clearFields();
        alert("Mail skickat");
      }
    } catch (error) {
      console.error("Error sending mail: ", error);
    }
  };

  const clearFields = () => {
    setName("");
    setPersonNumber("");
    setEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendReceipt();
  };

  return (
    <div className="flex flex-col text-center justify-center items-center">
      <h3 className="mb-6 text-xl font-bold">Skicka kvitto</h3>
      <form className="flex flex-col w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Personens namn
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=""
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="personNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Personnummer
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="personNumber"
                  id="personNumber"
                  value={personNumber}
                  onChange={(e) => setPersonNumber(e.target.value)}
                  placeholder="yyyymmdd-xxxx"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Personens email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
            value="Skicka kvitto"
          />
        </div>
      </form>
    </div>
  );
}
