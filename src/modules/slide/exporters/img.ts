import h2c from "html2canvas";

export const generateAndDownloadImg = async () => {
  try {
    const slideContent = document.getElementById("slide-content");
    if (!slideContent) throw `couldn't find element #slide-content`;
    const c = await h2c(slideContent, { scale: 4 });
    const a = document.createElement("a");
    a.href = c.toDataURL("image/jpeg");
    a.download = "slide.jpeg";
    a.click();
    URL.revokeObjectURL(a.href);
  } catch (e) {
    console.log("Error while generation pdf:", e);
  }
};
