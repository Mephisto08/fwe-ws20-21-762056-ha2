import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {Button8rem, DeleteButton} from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { msToHMS } from "../../Dashboard/components/taskList";
import { EditTrackingForm } from "./editTracking";

export enum TrackingType {
  INCOME = "income",
  EXPENSE = "expense",
}


export type Tracking = {
  id: number;
  description: string;
  created: string;
  updated: string;
  timeStart: Date;
  timeEnd: Date;
};


export const LabelList = styled.div`
  list-style: none;
  flex-grow: 1;
  font-size: 0.8rem;
  align-self: flex-end;
  display: flex;
  float: right;
  & > li {
    margin-right: 0.5rem;
    padding: 0.125rem;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colors.primary};
    display: block;
    color: #000;
  }
`;

export const TrackingFlex = styled.div`
  display: flex;
  align-items: center;
  
`;

export const TrackingHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const TrackingItemStyle = styled.div`
  margin: 0;
  min-height: 9rem;
  max-width: 100%;
  position: relative;
  padding: 0.7rem 2rem;
  &:hover {
    ${TrackingHighlight} {
      display: block;
    }
  }
`;
export const TrackingList = styled.div`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
  ${TrackingItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

export const TrackingTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
`;

export const TrackedTime = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  padding-top: 0.5rem; 
`;

export const TaskValue = styled.div`
  white-space: nowrap;
`;
export type TrackingItemProps = {
  tracking: Tracking;
  onClick?: (tracking: Tracking) => void;
  fetchTask: () => void;
};


export const TrackingItem: React.FC<TrackingItemProps> = ({
  tracking,
  onClick = () => {},
  fetchTask,

}) => {
    const {id, description, timeStart, timeEnd} = tracking;
    const [editTracking, setEditTracking] = useState(false);

    const deleteTracking = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await fetch(`/api/tracking/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json"},
        });
        fetchTask();
      };

      var oneDay = 60*1000; // hours*minutes*seconds*milliseconds 
      var timeStartDate = new Date(timeStart); 
      var timeEndDate = new Date(timeEnd); 

      let currentTime: Date;
    const actualTrackingTime = function(): string{
      currentTime = new Date();
      const diff = (timeEndDate.getTime() - timeStartDate.getTime());
      console.log(msToHMS(diff-diff%1000))
      return msToHMS(diff-diff%1000);
    };


  return ( 
    <TrackingItemStyle>
      <TrackingHighlight />
      <div> 
        <DeleteButton onClick={deleteTracking}/>
      </div>
      <TrackingFlex onClick={() => {
        console.log(tracking);
        onClick(tracking);
      }}>
          <div>
            <TrackingTitle>{description}</TrackingTitle>
            <TrackedTime>Start: {timeStartDate.toLocaleString()}</TrackedTime>
            <TrackedTime>Ende: {timeEndDate.toLocaleString()}</TrackedTime>
            <TrackedTime>Dauer: {actualTrackingTime()}
            </TrackedTime>
          </div>
      </TrackingFlex>
      <div>
        <Button8rem
        onClick= {() => {
            setEditTracking(!editTracking)
          }}
        >Editiere Tracking</Button8rem>

        {editTracking && (<Modal
            title="Editiere Tracking"
            onCancel={() => {
                setEditTracking(false);
            }}>
            <EditTrackingForm
              afterSubmit={() => {
              setEditTracking(false);
            }}
            trackingObject={tracking!} 
            fetchTask={fetchTask}
          />

        </Modal>
        )}
      </div>
    </TrackingItemStyle>
  );
};
