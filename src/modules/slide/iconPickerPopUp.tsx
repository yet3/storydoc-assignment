import { Button } from "@common/button";
import { IconPicker } from "@common/iconPicker";
import {
  useFloating,
  offset,
  flip,
  shift,
  useInteractions,
  useDismiss,
} from "@floating-ui/react";
import { useState } from "react";
import styled from "styled-components";
import { ISectionNoId } from "./section";

interface Props {
  update: (data: Partial<ISectionNoId>) => void;
  btnClassName?: string;
}

export const SlideIconPickerPopUp = ({ update, btnClassName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, strategy, refs, context } = useFloating({
    strategy: "absolute",
    placement: "top",
    middleware: [offset(-150), flip(), shift()],
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <>
      <StyledChangeBtn
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => setIsOpen((p) => !p)}
        className={btnClassName}
      >
        Change icon
      </StyledChangeBtn>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            zIndex: 100,
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            backgroundColor: "white",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.3)",
            width: "max-content",
          }}
          {...getFloatingProps()}
        >
          <IconPicker
            onPick={(icon) => {
              update({ icon: { ...icon } });
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </>
  );
};

const StyledChangeBtn = styled(Button)`
  position: absolute;
  z-index: 4;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1em;
  font-weight: 600;

  :hover {
    cursor: pointer;
  }
`;
