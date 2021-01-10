import styled from "styled-components";

export const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  background: transparent;
  border: 0.05rem solid var(--lightBlue);
  border-color: ${(props) =>
    props.cart
      ? "var(--mainYellow)"
      : props.close
      ? "var(--mainRed)"
      : props.login
      ? "transparent"
      : "var(--mainBlue)"};
  color: var(--lightBlue);
  color: ${(props) =>
    props.cart
      ? "var(--mainYellow)"
      : props.close
      ? "var(--mainRed)"
      : props.login
      ? "var(--mainWhite)"
      : "var(--mainBlue)"};
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  outline-color: red;
  cursor: pointer;
  display: inline-block;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: var(--lightBlue);
    background: ${(props) =>
      props.cart
        ? "var(--mainYellow)"
        : props.close
        ? "var(--mainRed)"
        : props.login
        ? "transparent"
        : "var(--mainBlue)"};
    color: var(--mainWhite);
  }
  &:focus {
    outline: none;
  }
`;
