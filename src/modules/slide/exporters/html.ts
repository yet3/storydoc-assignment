import type { ISection } from "../section";
// @ts-ignore
import template from "./htmlTemplate.html";

export interface IExportData {
  slideTitle: string;
  sections: ISection[];
}
export const generateSlideHtml = async ({
  slideTitle,
  sections,
}: IExportData) => {
  let html = template as string;

  html = html.replace(/{{slide_title}}/gm, slideTitle);

  sections.forEach((section, i) => {
    html = html.replaceAll(
      `{{section_${i}_icon_class}}`,
      section.icon.className
    );
    html = html.replaceAll(`{{section_${i}_icon_name}}`, section.icon.iconName);
    html = html.replaceAll(`{{section_${i}_title}}`, section.title);
    html = html.replaceAll(`{{section_${i}_description}}`, section.description);
  });

  return html;
};

export const generateAndDownloadHtmlTemplate = async (data: IExportData) => {
  const file = new Blob([await generateSlideHtml(data)], {
    type: "text/html",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "slide.html";
  a.click();
  URL.revokeObjectURL(a.href);
};
