import {Helper} from '../../helper';
import request from 'supertest';

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

  /**
  * Es werden nicht alle notwendigen Information mitgeschickt
  */
  it('createLabel test not all info', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
        .post('/api/label')
        .send({
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
  * Es wird eine Label Id mitgeschickt, welche nicht existiert
  */
  it('deleteLabelById test wrong infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const labelId = 55;

    request(helper.app)
        .delete(`/api/label/${labelId}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end(async (err, res) => {
          if (err) throw err;
          done();
        });
  });

  /**
  * Es wird eine Label Id mitgeschickt, welche nicht existiert
  */
  it('getAllTasksByLabelId test wrong infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const labelId = 55;
    request(helper.app)
        .get(`/api/label/task/${labelId}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end(async (err, res) => {
          if (err) throw err;
          done();
        });
  });

  /**
  * Es wird eine Label Id mitgeschickt, welche nicht existiert
  */
  it('getLabelById test wrong infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const labelId = 55;
    request(helper.app)
        .get(`/api/label/${labelId}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end(async (err, res) => {
          if (err) throw err;
          done();
        });
  });

  /**
  * Es wird eine Label Id mitgeschickt, welche nicht existiert
  */
  it('updateLabelById test wrong infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const labelId = 55;
    request(helper.app)
        .patch(`/api/label/${labelId}`)
        .send({
          name: 'Label test 2 Update',
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
