import { useAuth0 } from "@auth0/auth0-react";
import SendReceiptTemplateModal from "./SendReceiptTemplateModal";
import { apiBaseUrl } from "../config/urlConfig";

export default function ReceiptTemplate({
  receiptTemplate,
  fetchReceiptTemplates,
}) {
  const { getAccessTokenSilently } = useAuth0();

  const deleteReceiptTemplate = async (id) => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiBaseUrl}/receipt-templates/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to delete the receipt template");
      } 
    } catch (error) {
      console.error("Error: ", error);
    }

    await fetchReceiptTemplates();
  };

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-4">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {receiptTemplate.item}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {receiptTemplate.total_price}kr
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {receiptTemplate.moms}%
      </p>
      <div className="flex flex-col items-center justify-center space-y-2">
        <SendReceiptTemplateModal receiptTemplateId={receiptTemplate._id} />
      </div>
      <button
        onClick={() => deleteReceiptTemplate(receiptTemplate._id)}
        className="mt-2"
      >
        Ta bort mall
      </button>
    </div>
  );
}
