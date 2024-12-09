import { IReceiptInfo } from "../pdf/interface/IReceiptInfo";
import * as pdfBuilder from "../pdf/pdfBuilder";

export const createPDf = async (receiptInfo: IReceiptInfo) => {
  
  const pdfBytes = await pdfBuilder.buildPDF(receiptInfo);
  return pdfBytes;
};
