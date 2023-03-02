import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SlideExportOptions } from "./exportOptions";
import { ISection } from "./section";
import { EditableText } from "@common/editableText";
import { SlideSectionsList } from "./sectionsList";
import { iconTypeToClassName } from "@common/iconPicker";

const generateSection = (iconName: string) => ({
  id: Math.random().toString(),
  icon: {
    className: iconTypeToClassName("filled"),
    iconName: iconName,
  },
  title: "Insert text here",
  description: "Add your additional text here",
});

export const Slide = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    console.log(contentRef.current.innerHTML);
  }, []);

  const [title, setTitle] = useState("Insert a title here");
  const [sections, setSections] = useState<ISection[]>([
    generateSection("favorite"),
    generateSection("pie_chart"),
    generateSection("thumb_up"),
  ]);

  return (
    <StyledContainer>
      <SlideExportOptions sections={sections} slideTitle={title} />

      <StyledCard ref={contentRef}>
        <StyledContentWrapper id="slide-content">
          <h1 style={{ maxWidth: "80%" }}>
            <EditableText
              textAlign="center"
              value={title}
              onChange={setTitle}
            />
          </h1>
          <SlideSectionsList sections={sections} setSections={setSections} />
        </StyledContentWrapper>
      </StyledCard>
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  font-size: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StyledCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 20px;
  background-color: white;
  border-radius: 5px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;

  width: 80vw;
  min-height: 80vh;

  justify-content: center;
  align-items: center;
`;
