const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

exports.addSignatureIfPdf = async (
  filePath,
  signPath = path.join(__dirname, "../signatures/default-sign.png")
) => {
  if (!filePath.endsWith(".pdf")) return filePath;

  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const signatureImg = fs.readFileSync(signPath);
  const image = await pdfDoc.embedPng(signatureImg);
  const firstPage = pdfDoc.getPages()[0];
  const { width } = firstPage.getSize();

  firstPage.drawImage(image, { x: width - 150, y: 50, width: 100, height: 50 });

  const newPath = filePath.replace(/\.pdf$/, "_signed.pdf");
  const modifiedBytes = await pdfDoc.save();
  fs.writeFileSync(newPath, modifiedBytes);
  fs.unlinkSync(filePath);
  return newPath;
};