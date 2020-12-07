import { act, fireEvent, getByText, render, waitFor } from '@testing-library/react';
import { FetchMock } from 'jest-fetch-mock';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import { TaskOverviewPage } from './TaskOverviewPage';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';

fetchMock.enableMocks();
describe('TaskOverviewPage', () => {
	beforeEach(() => {
		(fetch as FetchMock).resetMocks();
	});
	it('create a Task', async () => {
		const taskInitialFetchResponse = {
			data: [],
			status: 'ok',
		};

		const taskPostResponse = {
			data: {
				name: 'Task Test 1 Test',
				description: 'Beschreibung Test 1 Test',
				created: new Date('2019-01-01'),
				updated: new Date('2019-01-01'),
				labels: [],
				trackings: [],
			},
			status: 'ok',
		};

		const taskResponse = {
			data: [
				{
					name: 'Task Test 1 Test',
					description: 'Beschreibung Test 1 Test',
					created: new Date('2019-01-01'),
					updated: new Date('2019-01-01'),
					labels: [],
					trackings: [],
				},
			],
			status: 'ok',
		};
		(fetch as FetchMock)
			.once(JSON.stringify(taskInitialFetchResponse))
			.once(JSON.stringify(taskPostResponse))
			.once(JSON.stringify(taskResponse));
		const { getByLabelText: getByLabelTextContainer, getByTestId, findAllByTestId } = render(
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<TaskOverviewPage />
				</BrowserRouter>
			</ThemeProvider>,
		);

		const createTask = getByTestId('create-task-button');

		await act(async () => {
			fireEvent.click(createTask);
		});
		await waitFor(() => {
			expect(getByTestId('create-task-form')).toBeInTheDocument();
		});
		const taskForm = getByTestId('create-task-form');

		const name = getByLabelTextContainer(/name/i);
		const description = getByLabelTextContainer(/beschreibung/i);

		fireEvent.change(name, {
			target: { value: taskResponse.data[0].name },
		});
		fireEvent.change(description, {
			target: { value: taskResponse.data[0].description },
		});

		const submit = getByText(taskForm, /Erstelle einen Task!/i);
		fireEvent.click(submit);

		await findAllByTestId('task-item');
		expect((await findAllByTestId('task-item')).length).toBe(1);
	});
});
