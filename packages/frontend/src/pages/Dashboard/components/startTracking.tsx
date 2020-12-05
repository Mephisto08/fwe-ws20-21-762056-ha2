/**
 * In dieser Datei, wird das Form erstellt
 * um Trackings für Task starten zukönnen.
 */
import React, { ChangeEvent, useContext, useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Button8rem, StopButton } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { formatTime, taskIdContext, taskNameContext } from './taskList';

export const Time = styled.div`
	font-size: 1.2rem;
	margin-bottom: 1rem;
`;
export const Title = styled.div`
	font-size: 1.4rem;
	margin-bottom: 1rem;
	margin-top: 1rem;
`;
export const StartTracking = styled.div`
	margin-bottom: 1rem;
	margin-top: 1rem;
	border-top: 0.15rem solid #202020;
`;

/**
 * Es wird afterSubmit bereitgestellt.
 * In dieser Funktion kann man als Aufrufender der Form alles angeben,
 * was nach dem submiten gemacht werden soll.
 * Die startTime wird vom Aufrufenden bereitgestellt.
 * Sie ist die Zeit, die als Start des Tracking angenommen wird.
 * fetchTask wird benötigt, damit die Task neu geladen werden,
 * nachdem ein Tracking pasuiert oder gestoppt wurde.
 * @return {HTML} HTML-Grundgerüst
 */
export const StartTrackingForm: React.FC<{
	afterSubmit: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	startTime: any;
	fetchTask: () => void;
}> = ({ afterSubmit, startTime, fetchTask }) => {
	let creationTime = startTime;
	const taskName = useContext(taskNameContext);
	const taskId = useContext(taskIdContext);
	const [tracking, setTracking] = useState({
		description: '',
		task: `${taskId}`,
	});
	const [buttonText, setButtonText] = useState('Pause');
	const [paused, setPaused] = useState(false);
	const [stop, setStop] = useState(false);
	let currentTime: Date;

	/**
	 * Berechnet die aktuelle Zeit, wie lange ein Tracking läuft
	 * @return {Time} Returend eine Funktion.
	 * Ihr wird eine Difgferenz in Millisekunden übergeben
	 * und wandelt diese in ein Zeitformat um.
	 */
	const actualTrackingTime = function (): string {
		currentTime = new Date();
		const diff = currentTime.getTime() - creationTime.getTime();
		return formatTime(diff - (diff % 1000));
	};
	const [trackingTime, setTrackingTime] = useState(actualTrackingTime());

	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTracking({ ...tracking, [e.target.name]: e.target.value });
	};

	const changeText = (text: React.SetStateAction<string>) => setButtonText(text);

	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		/**
		 * Dieses Phänomen kann ich mir nicht erklären.
		 * paused nimmt den gleichen Wert an in beiden logs.
		 * Erst beim nächsten Button klick switcht der bool.
		 * Ich weeiß, das dies durch den asynchronen
		 * Ablauf von dem useState entsteht.
		 * Jedoh warum dieser Button auf die Klicks so reagiert
		 * kann ich mir nicht erklären.
		 * Ebenso, wenn der StopButton geklickt wird,
		 * passiert kein Submit erst bei einem zweiten klicken
		 * eines beliebigen Buttons.
		 * Wenn ich bei einem Button ein onDoubleClick einbaue,
		 * reagiert dieser Button jedoch auch mit einem Klick.
		 * Bei einem Klick wird Pause und Weiter ausgeführt.
		 * Deswegen einen DoppelKlick ausführen, damit treten keine Fehler auf.
		 */
		console.log(paused, '+paused+stop+', stop);
		setPaused(!paused);
		console.log(paused, '+paused+stop+', stop);

		e.preventDefault();

		if (stop) {
			if (paused) {
				afterSubmit();
			} else if (!paused) {
				await fetch('/api/tracking', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						description: `${tracking.description}`,
						task: `${tracking.task}`,
						timeStart: `${creationTime}`,
						timeEnd: `${currentTime}`,
					}),
				});
				afterSubmit();
			}
		} else if (!stop) {
			if (!paused) {
				await fetch('/api/tracking', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						description: `${tracking.description}`,
						task: `${tracking.task}`,
						timeStart: `${creationTime}`,
						timeEnd: `${currentTime}`,
					}),
				});
			}
		}
		if (paused === false) {
			creationTime = new Date();
		}
		fetchTask();
	};

	useEffect(() => {
		if (!paused) {
			// eslint-disable-next-line
        const actualTime = setTimeout(() => {
				setTrackingTime(actualTrackingTime());
			}, 1000);
		}
	});

	return (
		<>
			<StartTracking>
				<Title>Starte ein Tracking für {taskName} </Title>
				<Time>Zeit: {trackingTime}</Time>

				<form onSubmit={onSubmitForm}>
					<Input name="description" label="Beschreibung" onChange={fieldDidChange} type="text" required />
					<Button8rem type="submit" onClick={() => changeText(paused ? 'Pause' : 'Weiter')}>
						{buttonText}
					</Button8rem>
					<StopButton type="submit" onClick={() => setStop(true)}></StopButton>
				</form>
			</StartTracking>
		</>
	);
};
