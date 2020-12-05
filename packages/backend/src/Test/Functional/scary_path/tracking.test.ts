import { Helper } from '../../helper';
import request from 'supertest';

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

	/**
	 * Es werden nicht alle notwendigen Information mitgeschickt
	 */
	it('createTracking test not all infos', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();

		request(helper.app)
			.post('/api/tracking')
			.send({
				description: 'Tracking Test 4',
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(400)
			.end(async (err, res) => {
				if (err) throw err;
				expect(res.body.error).toBe('Error: Parameter fehlt!');
				done();
			});
	});

	/**
	 * Es wird eine Tracking Id mitgeschickt, welche nicht existiert
	 */
	it('deleteTrackingById test wrong infos', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		const trackingId = 55;

		request(helper.app)
			.delete(`/api/tracking/${trackingId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404)
			.end(async (err, res) => {
				if (err) throw err;
				done();
			});
	});

	/**
	 * Es wird eine Tracking Id mitgeschickt, welche nicht existiert
	 */
	it('getTrackingById test wrong infos', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		const trackingId = 55;
		request(helper.app)
			.get(`/api/tracking/${trackingId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404)
			.end(async (err, res) => {
				if (err) throw err;
				done();
			});
	});

	/**
	 * Es wird eine Tracking Id mitgeschickt, welche nicht existiert
	 */
	it('updateTrackingById test wrong infos', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		const trackingId = 55;
		request(helper.app)
			.patch(`/api/tracking/${trackingId}`)
			.send({
				description: 'Tracking Test 2 Update',
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404)
			.end(async (err, res) => {
				if (err) throw err;
				done();
			});
	});
});
