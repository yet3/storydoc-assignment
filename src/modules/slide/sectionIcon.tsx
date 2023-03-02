import type { IIcon } from "@common/iconPicker";
import { useState } from "react";
import styled from "styled-components";
import { SlideIconPickerPopUp } from "./iconPickerPopUp";
import { ISectionNoId } from "./section";

interface Props {
  icon: IIcon;
  update: (data: Partial<ISectionNoId>) => void;
}

export const SlideSectionIcon = ({ icon, update }: Props) => {
  return (
    <StyledContainer>
      <StyledIcon className={icon.className}>{icon.iconName}</StyledIcon>
      <SlideIconPickerPopUp btnClassName="change-icon-btn" update={update} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  font-size: 1em;
  height: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .change-icon-btn {
    opacity: 0;
    pointer-events: none;
  }

  :hover {
    .change-icon-btn {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

const StyledIcon = styled.span`
  font-size: 10em;
`;
