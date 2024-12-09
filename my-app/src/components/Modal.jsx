import { useRef, useState, useEffect } from "react";
import AddReceiptTemplate from "./AddReceiptTemplate";

export default function Modal({ fetchReceiptTemplates }) {
  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const showDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setIsDialogOpen(true);
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    if (!isDialogOpen) {
      // TODO do something there?
    }
  }, [isDialogOpen]);

  return (
    <div className="flex justify-center items-center">
      <dialog
        ref={dialogRef}
        className="relative overflow-visible backdrop:bg-white/85" // Ensure backdrop is visible
      >
        <div className="bg-white border p-10">
          {" "}
          {/* Set a solid background color */}
          <AddReceiptTemplate fetchReceiptTemplates={fetchReceiptTemplates} />
        </div>
        <button
          className="absolute -top-2 -right-2 z-10 flex items-center justify-center w-5 h-5 bg-zinc-200 rounded-full shadow"
          onClick={closeDialog}
        >
          X<span className="sr-only">Close</span>
        </button>
      </dialog>
      <button className="content-center" onClick={showDialog}>
        Lägg till kvittomall
      </button>
    </div>
  );
}
