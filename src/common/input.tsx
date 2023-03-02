import styled from "styled-components";

export const Input = styled.input`
  font-size: 1em;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 1px;
  background-color: white;
  border-radius: 0.2em;
  padding: 0.5em 0.3em;
  width: 100%;
`;
