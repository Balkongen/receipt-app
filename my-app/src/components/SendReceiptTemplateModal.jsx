import { useRef } from "react";
import SendReceiptTemplateForm from "./SendReceiptTemplateForm";

export default function SendReceiptTemplateModal({receiptTemplateId}) {
  const dialogRef = useRef(null);

  const showDialog = async () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <dialog
        ref={dialogRef}
        className="relative overflow-visible backdrop:bg-white/85" // Ensure backdrop is visible
      >
        <div className="bg-white border p-10">
          {" "}
          {/* Set a solid background color */}
          <SendReceiptTemplateForm receiptTemplateId={receiptTemplateId}/>
        </div>
        <button
          className="absolute -top-2 -right-2 z-10 flex items-center justify-center w-5 h-5 bg-zinc-200 rounded-full shadow"
          onClick={() => closeDialog()}
        >
          X<span className="sr-only">Close</span>
        </button>
      </dialog>
      <button className="content-center" onClick={() => showDialog()}>
        Använd kvitto
      </button>
    </div>
  );
}
