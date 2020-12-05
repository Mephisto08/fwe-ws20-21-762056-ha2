import { Helper } from '../../helper';
import request from 'supertest';
import { Label } from '../../../data/Entities/Label';

const helper = new Helper();
helper.init();

describe('Tests for the Label class', () => {
	const helper = new Helper();

	beforeAll(async () => {
		await helper.init();
	});

	afterAll(async () => {
		await helper.shutdown();
	});

	it('createLabel Test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

		request(helper.app)
			.post('/api/label')
			.send({
				name: 'Label Test 4',
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, label] = await helper.getRepo(Label).findAndCount();
				expect(label).toBe(4);
				expect(res.body.data.name).toBe('Label Test 4');
				done();
			});
	});
	it('deleteLabelById Test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		let label = new Label();
		try {
			label = await helper.getRepo(Label).findOneOrFail({ id: 2 });
		} catch (error) {}

		request(helper.app)
			.delete(`/api/label/${label.id}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, label] = await helper.getRepo(Label).findAndCount();
				expect(label).toBe(2);
				done();
			});
	});
	it('getAllLabels Test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

		request(helper.app)
			.get('/api/label')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end((err, res) => {
				if (err) throw err;
				expect(res.body.data.length).toBe(3);
				expect(res.body.data[1].name).toBe('Label Test 2');
				done();
			});
	});
	it('getAllTasksByLabelId Test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		let label = new Label();
		try {
			label = await helper.getRepo(Label).findOneOrFail({ id: 2 });
		} catch (error) {}
		request(helper.app)
			.get(`/api/label/task/${label.id}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				expect(res.body.data[0].id).toBe(2);
				expect(res.body.data[0].name).toBe('Task Test 2');
				expect(res.body.data[1].id).toBe(3);
				expect(res.body.data[1].name).toBe('Task Test 3');
				done();
			});
	});
	it('getLabelById Test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		let label = new Label();
		try {
			label = await helper.getRepo(Label).findOneOrFail({ id: 2 });
		} catch (error) {}
		request(helper.app)
			.get(`/api/label/${label.id}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, label] = await helper.getRepo(Label).findAndCount();
				expect(label).toBe(3);
				expect(res.body.data.name).toBe('Label Test 2');
				done();
			});
	});
	it('updateLabelById Test', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		let label = new Label();
		try {
			label = await helper.getRepo(Label).findOneOrFail({ id: 2 });
		} catch (error) {}
		request(helper.app)
			.patch(`/api/label/${label.id}`)
			.send({
				name: 'Label Test 2 Update',
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end(async (err, res) => {
				if (err) throw err;
				const [, label] = await helper.getRepo(Label).findAndCount();
				expect(label).toBe(3);
				expect(res.body.data.name).toBe('Label Test 2 Update');
				done();
			});
	});
});
