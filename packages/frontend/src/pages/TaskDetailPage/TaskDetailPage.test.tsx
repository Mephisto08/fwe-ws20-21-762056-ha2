import { act, fireEvent, getByText, render, waitFor } from '@testing-library/react';
import { FetchMock } from 'jest-fetch-mock';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import fetchMock from 'jest-fetch-mock';
import { TaskDetailPage } from './TaskDetailPage';
import '@testing-library/jest-dom';

fetchMock.enableMocks();
describe('TaskDetailPage', () => {
	beforeEach(() => {
		(fetch as FetchMock).resetMocks();
	});
	it('adds an Item after Create', async () => {
		const trackingInitialFetchResponse = {
			data: [],
			status: 'ok',
		};

		const trackingPostResponse = {
			data: {
				name: 'Tracking Test 1 Test',
				created: new Date('2019-01-01'),
				updated: new Date('2019-01-01'),
				task: 1,
			},
			status: 'ok',
		};

		const trackingResponse = {
			data: [
				{
					name: 'Tracking Test 2 Test',
					created: new Date('2019-01-01'),
					updated: new Date('2019-01-01'),
					task: 1,
				},
			],
			status: 'ok',
		};
		(fetch as FetchMock)
			.once(JSON.stringify(trackingInitialFetchResponse))
			.once(JSON.stringify(trackingPostResponse))
			.once(JSON.stringify(trackingResponse));
		const { getByLabelText: getByLabelTextContainer, getByTestId, findAllByTestId } = render(
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<TaskDetailPage />
				</BrowserRouter>
			</ThemeProvider>,
		);

		const createTask = getByTestId('create-tracking-button');

		await act(async () => {
			fireEvent.click(createTask);
		});
		await waitFor(() => {
			expect(getByTestId('create-tracking-form')).toBeInTheDocument();
		});
		const trackingForm = getByTestId('create-tracking-form');

		const name = getByLabelTextContainer(/name/i);
		const task = getByLabelTextContainer(/task/i);

		fireEvent.change(name, {
			target: { value: trackingResponse.data[0].name },
		});
		fireEvent.change(task, {
			target: { value: trackingResponse.data[0].task },
		});

		const submit = getByText(trackingForm, /Erstelle einen Tracking für diesen Task!/i);
		fireEvent.click(submit);

		await findAllByTestId('tracking-item');
		expect((await findAllByTestId('tracking-item')).length).toBe(1);
	});
});
