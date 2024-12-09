import ReceiptTemplate from "./ReceiptTemplate";

const ReceiptTemplateList = ({ templates, fetchReceiptTemplates }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {templates.length === 0 ? (
        <p>
          Det finns inga kvittomallar. Klicka på knappet för att lägga till.
        </p>
      ) : (
        templates.map((template) => (
          <ReceiptTemplate
            key={template._id}
            receiptTemplate={template}
            fetchReceiptTemplates={fetchReceiptTemplates}
          />
        ))
      )}
    </div>
  );
};

export default ReceiptTemplateList;
