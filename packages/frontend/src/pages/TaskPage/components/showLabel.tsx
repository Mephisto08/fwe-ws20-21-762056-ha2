import React, { useState, ChangeEvent, useEffect } from "react";
import { Label, LabelItem, LabelList } from "../../Dashboard/components/taskList";



export const ShowLabelForm: React.FC<{ afterSubmit: () => void; }> = ({
    afterSubmit,
}) => {
    const [allLabel, setLabel] = useState<Label[]>([]);

    const fetchLabel = async function () {
        const labelRequest = await fetch("/api/label", {
          method: "GET",
          headers: { "content-type": "application/json"},
        });
        console.log(labelRequest);
        if (labelRequest.status === 200) {
          const labelJSON = await labelRequest.json();
          setLabel(labelJSON.data);
        }
      };
    
      useEffect(() => {
        fetchLabel();
      }, []);

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(allLabel);

        await fetch(`/api/task/label`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...allLabel,
            }),
        });
        afterSubmit();
    };
    return (
        <>
        <div>
            <h3>Alle Labels</h3>
            <LabelItem>
              <LabelList>
                {allLabel &&
                  allLabel.map((label: Label) => {
                  return <li key={label.id}>{label.id} {label.name}</li>;
                })}
            </LabelList>
          </LabelItem>
          </div>
        </>
    );
};
