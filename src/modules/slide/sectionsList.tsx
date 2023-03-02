import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { ISection, ISectionNoId, SlideSection } from "./section";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SetStateAction } from "react";
import styled from "styled-components";
import { NoSSR } from "@common/noSSR";

interface Props {
  sections: ISection[];
  setSections: (s: SetStateAction<ISection[]>) => void;
}

const isSSR = () => typeof window === "undefined";
export const SlideSectionsList = ({ sections, setSections }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id === over?.id) return;

    setSections((items) => {
      const activeIdx = items.findIndex((e) => e.id === active.id);
      const overIdx = items.findIndex((e) => e.id === over?.id);
      if (activeIdx < 0 || overIdx < 0) return items;
      return arrayMove(items, activeIdx, overIdx);
    });
  };

  const handleUpdateSection = (id: string, data: Partial<ISectionNoId>) => {
    setSections((items) => {
      const idx = items.findIndex((e) => e.id === id);
      if (idx >= 0) {
        const cloned = items.slice();
        cloned[idx] = { ...cloned[idx], ...data, id };
        return cloned;
      }
      return items;
    });
  };

  return (
    <NoSSR>
      {!isSSR() && (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <StyledList>
            <SortableContext items={sections}>
              {sections.map((section) => (
                <SlideSection
                  key={section.id}
                  data={section}
                  update={(data) => handleUpdateSection(section.id, data)}
                />
              ))}
            </SortableContext>
          </StyledList>
        </DndContext>
      )}
    </NoSSR>
  );
};

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
`;
