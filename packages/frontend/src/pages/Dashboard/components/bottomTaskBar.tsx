import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Button8rem, PauseButton, StartButton, StopButton } from "../../../components/Button";
import { Input } from "../../../components/Input";

const Bar = styled.div`
list-style: none;
padding: 0;
background-color: ${(props) => props.theme.colors.secondaryFontColor};
position: fixed;
bottom: 0;
margin: 0;
border-radius: 0.5rem;
width: 80%;
float: left;
`;


export const BottomTaskBar = () => {

   

    const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
      };
      const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        await fetch("/api/tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
          }),
        });
      };


    return (
        <Bar>
            <div>
                <h2 >Task:</h2>
                <form onSubmit={onSubmitForm}>
                    <Input
                    name="description"
                    label="Was machst du?"
                    type="text"
                    required
                    />
                    <StartButton type="submit">Starte</StartButton>
                </form>
            <StartButton></StartButton>
            <StopButton></StopButton>
            <PauseButton></PauseButton>
        </div>
        </Bar>
    )
};