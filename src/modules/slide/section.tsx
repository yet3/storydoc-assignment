import { DragBtn } from "@common/dragBtn";
import { EditableText } from "@common/editableText";
import type { IIcon } from "@common/iconPicker";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import { SlideSectionIcon } from "./sectionIcon";

export interface ISection {
  id: string;
  icon: IIcon;
  title: string;
  description: string;
}
export type ISectionNoId = Omit<ISection, "id">;

interface Props {
  data: ISection;
  update: (data: Partial<ISectionNoId>) => void;
}

export const SlideSection = ({ data, update }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : "auto",
  };

  return (
    <StyledContainer ref={setNodeRef} style={style} {...attributes}>
      <DragBtn className="section-drag-btn" {...listeners} />

      <SlideSectionIcon update={update} icon={data.icon} />

      <h2>
        <EditableText
          textAlign="center"
          value={data.title}
          onChange={(v) => update({ title: v })}
        />
      </h2>

      <EditableText
        textAlign="center"
        value={data.description}
        onChange={(v) => update({ description: v })}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.li`
  width: 250px;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  position: relative;
  border: 2px dashed transparent;

  .section-drag-btn {
    z-index: 5;
    position: absolute;
    top: 0.25em;
    left: 0.25em;
    opacity: 0;
    pointer-events: none;
  }

  :hover {
    border-color: ${({ theme }) => theme.colors.blue};
    .section-drag-btn {
      opacity: 1;
      pointer-events: all;
    }
  }
`;
