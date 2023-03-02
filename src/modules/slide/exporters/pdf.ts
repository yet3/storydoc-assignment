import { jsPDF } from "jspdf";
import h2c from "html2canvas";
import { generateSlideHtml, IExportData } from "./html";

export const generateAndDownloadPdf = async () => {
  try {
    const slideContent = document.getElementById("slide-content");
    if (!slideContent) throw `couldn't find element #slide-content`;
    const rect = slideContent.getBoundingClientRect();

    const c = await h2c(slideContent, { scale: 3 });
    const doc = new jsPDF();
    const img = c.toDataURL("image/jpeg");
    const pdfW = doc.internal.pageSize.getWidth();
    const pdfH = doc.internal.pageSize.getHeight();
    const imgH = pdfW * (rect.height / rect.width);
    doc.addImage(
      img,
      "jpeg",
      0,
      pdfH / 2 - imgH / 2,
      pdfW,
      imgH,
      undefined,
      "MEDIUM"
    );
    doc.save("slide.pdf");
  } catch (e) {
    console.log("Error while generation pdf:", e);
  }
};

export const generateAndPrintPdf = async (data: IExportData) => {
  const html = await generateSlideHtml(data);
  const win = window.open("", "_blank");
  if (win) {
    win.document.write(html);
    setTimeout(() => {
      if (win.stop) {
        win.stop();
      }
      win.print();
      win.close();
    }, 250);
  }
};
