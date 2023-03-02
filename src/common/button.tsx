import styled, { StyledComponentPropsWithRef } from "styled-components";

interface AdditionalProps {
  width?: string;
  height?: string;
  padding?: string;
}

export type ButtonsProps = StyledComponentPropsWithRef<"button"> &
  AdditionalProps;

export const Button = styled.button<AdditionalProps>`
  font-size: 1em;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 1px;
  background-color: white;
  border-radius: 0.2em;

  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.width ?? "auto"};
  height: ${(props) => props.height ?? "auto"};
  padding: ${(props) => props.padding ?? "0.25em 0.5em"};

  :hover {
    cursor: pointer;
  }
`;
