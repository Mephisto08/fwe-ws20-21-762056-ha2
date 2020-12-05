import { Helper } from '../../helper';
import request from 'supertest';
import { Tracking } from '../../../data/Entities/Tracking';
import { Task } from '../../../data/Entities/Task';

const helper = new Helper();
helper.init();

describe('Tests for the Tracking class', () => {
	const helper = new Helper();

	beforeAll(async () => {
		await helper.init();
	});

	afterAll(async () => {
		await helper.shutdown();
	});

	it('createTracking test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		let task = new Task();
		try {
			task = await helper.getRepo(Task).findOneOrFail({ id: 2 });
		} catch (error) {}
		const taskId = task.id;
		const taskName = task.name;

		request(helper.app)
			.post('/api/tracking')
			.send({
				description: 'Tracking Test 4',
				task: `${taskId}`,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, tracking] = await helper.getRepo(Tracking).findAndCount();
				expect(tracking).toBe(4);
				expect(res.body.data.description).toBe('Tracking Test 4');
				expect(res.body.data.task.id).toBe(taskId);
				expect(res.body.data.task.name).toBe(taskName);
				done();
			});
	});
	it('deleteTrackingById test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		let tracking = new Tracking();
		tracking = await helper.getRepo(Tracking).findOneOrFail({ id: 2 });

		request(helper.app)
			.delete(`/api/tracking/${tracking.id}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, tracking] = await helper.getRepo(Tracking).findAndCount();
				expect(tracking).toBe(2);
				done();
			});
	});
	it('getAllTracking test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		let task = new Task();
		try {
			task = await helper.getRepo(Task).findOneOrFail({ id: 2 });
		} catch (error) {}
		request(helper.app)
			.get('/api/tracking')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end((err, res) => {
				if (err) throw err;
				expect(res.body.data.length).toBe(3);
				expect(res.body.data[1].description).toBe('Tracking Test 2');
				expect(res.body.data[1].task.id).toBe(task.id);
				expect(res.body.data[1].task.name).toBe('Task Test 2');
				done();
			});
	});
	it('getTrackingById test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		let tracking = new Tracking();
		let task = new Task();
		try {
			tracking = await helper.getRepo(Tracking).findOneOrFail({ id: 2 });
			task = await helper.getRepo(Task).findOneOrFail({ id: 2 });
		} catch (error) {}

		request(helper.app)
			.get(`/api/tracking/${tracking.id}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, tracking] = await helper.getRepo(Tracking).findAndCount();
				expect(tracking).toBe(3);

				expect(res.body.data.description).toBe('Tracking Test 2');
				expect(res.body.data.task.id).toBe(task.id);
				expect(res.body.data.task.name).toBe('Task Test 2');
				done();
			});
	});
	it('updateTrackingById test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		let tracking = new Tracking();
		let task = new Task();
		try {
			tracking = await helper.getRepo(Tracking).findOneOrFail({ id: 2 });
			task = await helper.getRepo(Task).findOneOrFail({ id: 2 });
		} catch (error) {}

		request(helper.app)
			.patch(`/api/tracking/${tracking.id}`)
			.send({
				description: 'Tracking Test 2 Update',
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, tracking] = await helper.getRepo(Tracking).findAndCount();
				expect(tracking).toBe(3);
				expect(res.body.data.description).toBe('Tracking Test 2 Update');
				expect(res.body.data.task.id).toBe(task.id);
				expect(res.body.data.task.name).toBe('Task Test 2');
				done();
			});
	});
});
