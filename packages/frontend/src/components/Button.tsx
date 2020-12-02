/**
 * In dieser Datei werden alle Buttons definiert,
 * die in der gesamten Anwednung verwendet werden.
 * Grundlegendes Design der Buttons.
 */
import React from "react";
import styled from "styled-components";

export const AddButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    margin-left: 0.5rem;
    width: 48px;
    border: 0px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        focusable="false"
        style={{ fill: "#000", height: "24px", width: "24px" }}
      >
        <path d="M14.5 2a1.5 1.5 0 0 1 3 0v28a1.5 1.5 0 0 1-3 0V2z"></path>
        <path d="M30 14.5a1.5 1.5 0 0 1 0 3H2a1.5 1.5 0 0 1 0-3h28z"></path>
      </svg>
    </StyledButton>
  );
};

export const AddLabelButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    margin-left: 0.5rem;
    width: 48px;
    border: 0px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      Add. Label
    </StyledButton>
  );
};

export const Button8rem = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: #000;
  border: 0px;
  border-radius: 5px;
  line-height: 22.4px;
  padding: 13.2px 26.4px;
  text-align: center;
  width: 8rem;
  font-weight: 500;
  transition-duration: 250ms;
  outline: 0;
  margin-right: 1rem;
  margin-top: 0.5rem;
  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const Button20rem = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  margin-bottom: 1rem;
  color: #000;
  border: 0px;
  border-radius: 5px;
  line-height: 22.4px;
  padding: 13.2px 26.4px;
  text-align: center;
  width: 20rem;
  font-weight: 500;
  transition-duration: 250ms;
  outline: 0;
  margin-right: 1rem;
  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const ButtonModal = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: #000;
  border: 0px;
  border-radius: 5px;
  line-height: 22.4px;
  padding: 13.2px 26.4px;
  text-align: center;
  width: 100%;
  font-weight: 500;
  transition-duration: 250ms;
  outline: 0;
  margin-right: 1rem;
  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const CreateLabelButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    margin-left: 0.5rem;
    width: 48px;
    border: 0px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      Erstelle Label
    </StyledButton>
  );
};

export const DeleteButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    width: 48px;
    border: 0px;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    float: right;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" viewBox="0 0 12 16"><path fillRule="evenodd" d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z" /></svg>
    </StyledButton>
  );
};

export const DeleteLabelsButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    margin-left: 0.5rem;
    width: 48px;
    border: 0px;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    float: right;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      Entf. Label
    </StyledButton>
  );
};

export const DeleteLabelButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    margin-left: 0.5rem;
    width: 48px;
    border: 0px;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    float: right;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      Lösche Label
    </StyledButton>
  );
};
export const EditButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    width: 48px;
    border: 0px;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    float: right;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      Edit. Task
    </StyledButton>
  );
};

export const FilterButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    margin-left: 0.5rem;
    width: 48px;
    border: 0px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      Filter
    </StyledButton>
  );
};

export const PauseButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    margin-left: 0.5rem;
    width: 48px;
    border: 0px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 1262.000000 1280.000000"
        preserveAspectRatio="xMidYMid meet">
        <metadata>
          Created by potrace 1.15, written by Peter Selinger 2001-2017
      </metadata>
        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
          fill="#000000" stroke="none">
          <path d="M669 12214 c-59 -18 -130 -81 -160 -141 l-24 -48 0 -5650 0 -5650 23
      -47 c13 -26 43 -65 67 -87 83 -77 -104 -71 2295 -71 2400 0 2212 -6 2295 71
      24 23 54 62 67 87 l23 47 0 5650 0 5650 -23 47 c-13 25 -43 64 -67 87 -83 77
      105 71 -2299 70 -1824 0 -2158 -3 -2197 -15z"/>
          <path d="M7542 12211 c-63 -22 -123 -76 -155 -141 l-22 -45 0 -5650 0 -5650
      23 -47 c13 -25 43 -64 67 -87 83 -77 -105 -71 2295 -71 2399 0 2212 -6 2295
      71 24 22 54 61 67 87 l23 47 0 5650 0 5650 -24 48 c-31 63 -101 123 -164 142
      -44 13 -321 15 -2201 15 -2062 -1 -2153 -1 -2204 -19z"/>
        </g>
      </svg>
    </StyledButton>
  );
};
export const ShowLabelButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    margin-left: 0.5rem;
    width: 48px;
    border: 0px;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    float: right;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      Zeige Labels
    </StyledButton>
  );
};

export const StartButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    margin-left: 0.5rem;
    width: 48px;
    border: 0px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" stroke="black" fill="#000"><path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z" /></svg>
    </StyledButton>
  );
};

export const StopButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    margin-left: 0.5rem;
    width: 48px;
    border: 0px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      <svg width="24" height="24"><rect width="100%" height="100%" fill="rgb(45, 45, 45)" /></svg>
    </StyledButton>
  );
};





