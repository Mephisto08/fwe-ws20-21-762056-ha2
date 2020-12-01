/**
 * In dieser Datei wird alles bereitgestellt,
 * um alle Label anzeigen zukönnen.
 */
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Label} from "../../Dashboard/components/taskList";

export const LabelList = styled.ul`
  flex-grow: 1;
  font-size: 0.8rem;
  align-self: flex-end;
  float: left;
  & > li {
    margin-right: 0.5rem;
    padding: 0.125rem;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colors.primary};
    display: block;
    color: #000;
  }
`;

export const ShowAllLabelForm: React.FC<{ afterSubmit: () => void; }> = ({
  afterSubmit,
}) => {
  const [allLabel, setLabel] = useState<Label[]>([]);

  const fetchLabel = async function () {
    const labelRequest = await fetch("/api/label", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    if (labelRequest.status === 200) {
      const labelJSON = await labelRequest.json();
      setLabel(labelJSON.data);
    }
  };

  useEffect(() => {
    fetchLabel();
  }, []);

  return (
    <>
      <h3>Alle Labels</h3>
      <LabelList>
        {allLabel &&
          allLabel.map((label: Label) => {
            return <li css={"margin-top: 0.2rem;"} key={label.id}>{label.id} {label.name}</li>;
          })}
      </LabelList>
    </>
  );
};
