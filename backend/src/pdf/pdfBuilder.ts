import * as fs from "fs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { IReceiptInfo } from "./interface/IReceiptInfo";


// TODO Should date be present, and what date? date of payment I assume.
// TODO make it look nicer
const constructPDF = async (receiptInfo: IReceiptInfo, heading: string) => {
  const pdfDoc = await PDFDocument.create();

  // Add a blank page to the document
  const page = pdfDoc.addPage([600, 800]);

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Set up some basic layout values
  const margin = 50;
  const fontSize = 12;
  const lineHeight = fontSize * 1.5;
  let y = page.getHeight() - margin;

  // Draw heading
  page.drawText(heading, {
    x: margin,
    y: y,
    size: 24,
    font: helveticaBoldFont,
    color: rgb(0, 0, 0),
  });

  y -= lineHeight * 2;

  // Draw the date
  const currentDate = new Date().toISOString().split('T')[0];
  page.drawText(`Datum: ${currentDate}`, {
    x: margin,
    y: y,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  y -= lineHeight * 2;

  // Draw company details
  page.drawText(receiptInfo.companyName, {
    x: margin,
    y: y,
    size: fontSize,
    font: helveticaBoldFont,
    color: rgb(0, 0, 0),
  });
  y -= lineHeight;

  page.drawText(`Org. Nr: ${receiptInfo.companyOrgNumber}`, {
    x: margin,
    y: y,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  y -= lineHeight;

  // Draw a line
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: page.getWidth() - margin, y: y },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  y -= lineHeight;

  page.drawText(`Nyttjare: ${receiptInfo.personName}`, {
    x: margin,
    y: y,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  y -= lineHeight;

  page.drawText(`Personnummer: ${receiptInfo.personNumber}`, {
    x: margin,
    y: y,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  y -= lineHeight * 2;

  // Draw a line
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: page.getWidth() - margin, y: y },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  y -= lineHeight;

  // Draw table header
  const tableHeader = [
    { text: 'Beskrivning', width: 200 },
    { text: 'Momssats', width: 100 },
    { text: 'Kostnad', width: 100 },
    { text: 'Summa', width: 100 },
  ];

  let x = margin;
  tableHeader.forEach(header => {
    page.drawText(header.text, {
      x,
      y,
      size: fontSize,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    x += header.width;
  });

  y -= lineHeight;

  // Draw table row
  const tableRow = [
    { text: receiptInfo.item, width: 200 },
    { text: `${receiptInfo.moms.toString()}%`, width: 100 },
    { text: `${receiptInfo.totalCost.toFixed(2)} kr`, width: 100 },
    { text: `${receiptInfo.totalCost.toFixed(2)} kr`, width: 100 },
  ];

  x = margin;
  tableRow.forEach(row => {
    page.drawText(row.text, {
      x,
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    x += row.width;
  });
  

  y -= lineHeight * 2;

  // Draw another line
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: page.getWidth() - margin, y: y },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  y -= lineHeight;


  // Save the PDF
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};

export const buildPDF = async (receiptInfo: IReceiptInfo) => {
  const pdfBytes = await constructPDF(receiptInfo, "Friskvårdskvitto");
  return pdfBytes;
};
