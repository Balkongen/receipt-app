import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { apiBaseUrl } from "../config/urlConfig";

export default function AddReceiptTemplate({ fetchReceiptTemplates }) {
  const { getAccessTokenSilently } = useAuth0();

  const [itemName, setItemName] = useState("");
  const [moms, setMoms] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const createReceiptTemplate = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiBaseUrl}/receipt-templates`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: itemName,
          moms: moms,
          total_price: totalCost,
        }),
      });

      if (!response.ok) {
        console.error("Error creating receiptTemplate");
        alert("Ett fel uppstod");
        return;
      }
    } catch (error) {
      console.error("Error creating receiptTemplate: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReceiptTemplate();
    await fetchReceiptTemplates();
  };

  return (
    <div className="flex flex-col text-center justify-center items-center">
      <h3 className="mb-6 text-xl font-bold">Lägg till kvittomall</h3>
      <form className="flex flex-col w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-8">
            <div>
              <label
                htmlFor="item"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Namn på produkten
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="item"
                  id="item"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Gymkort"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="moms"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Moms-sats
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="moms"
                  id="moms"
                  value={moms}
                  onChange={(e) => setMoms(e.target.value)}
                  placeholder="%"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="totalCost"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Totalkostnad
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="totalCost"
                  id="totalCost"
                  value={totalCost}
                  onChange={(e) => setTotalCost(e.target.value)}
                  placeholder="kr"
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
            value="Spara"
          />
        </div>
      </form>
    </div>
  );
}
