import { FormEvent, KeyboardEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";
import styled, { CSSProperties, css } from "styled-components";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;

  style?: CSSProperties;
  minWidth?: string;
  maxWidth?: string;
  textAlign?: CSSProperties["textAlign"];
}

export const EditableText = ({
  value,
  onChange,
  style,
  minWidth = "2em",
  maxWidth,
  textAlign,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const savedCaretPos = useRef<number>(0);

  const handleOnInput = (e: FormEvent<HTMLDivElement>) => {
    const el = e.target as HTMLElement;
    const text = el.innerText;
    if (value === text) return;

    if (onChange) {
      flushSync(() => {
        onChange(text);
      });

      const sel = window.getSelection();
      if (sel && el.childNodes[0] && el.childNodes[0].nodeType === 3) {
        const range = new Range();
        range.setStart(
          el.childNodes[0],
          Math.min(el.innerText.length, savedCaretPos.current)
        );
        range.collapse();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const sel = window.getSelection();
    if (sel) {
      const range = sel.getRangeAt(0);
      if (range) {
        if (e.key === "Enter") {
          const el = e.target as HTMLDivElement;
          const startOffset = range.startOffset;

          if (startOffset === el.innerText.length) {
            savedCaretPos.current = el.innerText.length + 1;
          } else {
            e.preventDefault();
            el.innerText =
              el.innerText.substring(0, startOffset) +
              "\n" +
              el.innerText.substring(startOffset, el.innerText.length);
            savedCaretPos.current = startOffset + 1;
          }

          el.dispatchEvent(new Event("input", { bubbles: true }));
          return;
        }

        if (e.key === "Backspace") {
          savedCaretPos.current = range.startOffset - 1;
        } else if (e.key === "Delete") {
          savedCaretPos.current = range.startOffset;
        } else {
          savedCaretPos.current = range.startOffset + 1;
        }
      }
    }
  };

  return (
    <StyledContainer
      ref={ref}
      role="textbox"
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onInput={handleOnInput}
      onKeyDown={handleKeyDown}
      showBorder={isFocused || value.trim().length === 0}
      style={{
        ...style,
        minWidth: minWidth,
        maxWidth: maxWidth,
        textAlign: textAlign,
      }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

const editingBorderWidth = 2;
const editingPaddingX = 2;
const editingPaddingY = 2;
const StyledContainer = styled.div<{ showBorder?: boolean }>`
  outline: none;
  position: relative;
  z-index: 1;
  white-space: pre-wrap;

  ::before {
    content: "";
    position: absolute;
    top: -${editingBorderWidth + editingPaddingY}px;
    left: -${editingBorderWidth + editingPaddingX}px;
    width: 100%;
    height: 100%;
    padding: ${editingPaddingY}px ${editingPaddingX}px;
    pointer-events: none;
    border-radius: 0.1em;
    border: ${editingBorderWidth}px dashed transparent;
    z-index: -1;
  }

  ${({ showBorder }) =>
    showBorder
      ? css`
          ::before {
            border-color: ${({ theme }) => theme.colors.green};
            background-color: white;
          }
        `
      : css`
          :hover {
            ::before {
              border-color: ${({ theme }) => theme.colors.blue};
            }
          }
        `}
`;
