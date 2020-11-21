import {Helper} from '../../helper';
import request from 'supertest';

const helper = new Helper();
helper.init();

describe('Tests for the Task class', () => {
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
  it('addLabelsByTaskId test Fail not all infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    request(helper.app)
        .post(`/api/task/label/2`)
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
  * Es wird eine Task Id mitgeschickt, welche nicht existiert
  */
  it('addLabelsByTaskId Test wrong taskId', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const taskId = 55;

    request(helper.app)
        .post(`/api/task/label/${taskId}`)
        .send({
          labelList: [1],
        })
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
  it('addLabelsByTaskId Test wrong labelId', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const taskId = 1;

    request(helper.app)
        .post(`/api/task/label/${taskId}`)
        .send({
          labelList: [1, 20],
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          done();
        });
  });
  /**
  * Es werden nicht alle notwendigen Information mitgeschickt
  */
  it('createTask test not all infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
        .post('/api/task')
        .send({
          name: 'Task Test 4',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end(async (err, res) => {
          if (err) throw err;
          done();
        });
  });

  /**
  * Es wird eine Task Id mitgeschickt, welche nicht existiert
  */
  it('deleteLabelsByTaskId Test not all infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    try {
    } catch (error) {
    }
    request(helper.app)
        .delete(`/api/task/label/2`)
        .send({
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .end(async (err, res) => {
          if (err) throw err;
          done();
        });
  });

  /**
  * Es wird eine Task Id mitgeschickt, welche nicht existiert
  */
  it('deleteLabelsByTaskId test wrong infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const taskId = 55;

    request(helper.app)
        .delete(`/api/task/label/${taskId}`)
        .send({
          labelList: [2],
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end(async (err, res) => {
          if (err) throw err;
          done();
        });
  });

  /**
  * Es wird eine Task Id mitgeschickt, welche nicht existiert
  */
  it('deleteTaskById Test wrong infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const taskId = 55;
    request(helper.app)
        .delete(`/api/task/${taskId}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end(async (err, res) => {
          if (err) throw err;
          done();
        });
  });

  /**
  * Es wird eine Task Id mitgeschickt, welche nicht existiert
  */
  it('getAllLabesByTaskId test wrong infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const taskId = 55;

    request(helper.app)
        .get(`/api/task/label/${taskId}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end(async (err, res) => {
          if (err) throw err;
          done();
        });
  });

  /**
  * Es wird eine Task Id mitgeschickt, welche nicht existiert
  */
  it('getAllTrackingsByTaskId test wrong infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const taskId = 55;
    request(helper.app)
        .get(`/api/task/tracking/${taskId}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end(async (err, res) => {
          if (err) throw err;
          done();
        });
  });

  /**
  * Es wird eine Task Id mitgeschickt, welche nicht existiert
  */
  it('getAllTrackingsByTaskId test wrong infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const taskId = 55;
    request(helper.app)
        .get(`/api/task/${taskId}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end(async (err, res) => {
          if (err) throw err;
          done();
        });
  });

  /**
  * Es wird getestet, ob keine Task exisitieren
  */
  it('sendSlackAll test no Tasks', async (done) => {
    await helper.resetDatabase();
    request(helper.app)
        .post(`/api/task/slack`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          expect(res.body.data).toBe('!!! Keine Task in der Datenbank !!!');
          done();
        });
  });

  /**
  * Es wird eine Task Id mitgeschickt, welche nicht existiert
  */
  it('sendSlackByTaskId test wrong infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const taskId = 55;
    request(helper.app)
        .post(`/api/task/slack/${taskId}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end(async (err, res) => {
          done();
        });
  });

  /**
  * Es wird eine Task Id mitgeschickt, welche nicht existiert
  */
  it('updateTaskById test wrong infos', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const taskId = 55;
    request(helper.app)
        .patch(`/api/task/${taskId}`)
        .send({
          name: 'Task Test 2 Update',
          description: 'Beschreibung Test 2 Update',
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
