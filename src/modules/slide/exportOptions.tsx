import { Button } from "@common/button";
import styled from "styled-components";
import {
  generateAndDownloadHtmlTemplate,
  generateAndDownloadPdf,
  generateAndDownloadImg,
  generateAndPrintPdf,
  IExportData,
} from "./exporters";

export const SlideExportOptions = (props: IExportData) => {
  return (
    <StyledContainer>
      <span>Export as</span>
      <Button onClick={() => generateAndDownloadHtmlTemplate(props)}>
        HTML
      </Button>

      <Button onClick={() => generateAndDownloadPdf()}>PDF</Button>
      <Button onClick={() => generateAndPrintPdf(props)}>PRINT</Button>
      <Button onClick={() => generateAndDownloadImg()}>JPEG</Button>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  gap: 0.3em;
  align-items: center;
`;
