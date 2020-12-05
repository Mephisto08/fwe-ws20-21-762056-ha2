import {Helper} from '../../helper';
import request from 'supertest';
import {Task} from '../../../data/Entities/Task';
import {Tracking} from '../../../data/Entities/Tracking';


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

  it('addLabelsByTaskId test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }
    request(helper.app)
        .post(`/api/task/label/${task.id}`)
        .send({
          labelList: [1],
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          expect(res.body.data.labels.length).toBe(3);
          expect(res.body.data.labels[1].name).toBe('Label Test 3');
          expect(res.body.data.labels[2].id).toBe(1);
          done();
        });
  });

  it('createTask test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
        .post('/api/task')
        .send({
          name: 'Task Test 4',
          description: 'Beschreibung Test 4',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          const [, task] =
            await helper.getRepo(Task).findAndCount();
          expect(task).toBe(4);
          expect(res.body.data.name).toBe('Task Test 4');
          done();
        });
  });

  it('deleteLabelsByTaskId test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }
    request(helper.app)
        .delete(`/api/task/label/${task.id}`)
        .send({
          labelList: [2],
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          expect(res.body.data.labels.length).toBe(1);
          expect(res.body.data.labels[0].id).toBe(3);
          done();
        });
  });

  it('deleteTaskById test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }
    request(helper.app)
        .delete(`/api/task/${task.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          const [, task] =
            await helper.getRepo(Task).findAndCount();
          expect(task).toBe(2);
          const [, tracking] =
          await helper.getRepo(Tracking).findAndCount();
          expect(tracking).toBe(2);
          done();
        });
  });

  it('getAllLabesByTaskId test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }


    request(helper.app)
        .get(`/api/task/label/${task.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          const [, task] =
            await helper.getRepo(Task).findAndCount();
          expect(task).toBe(3);
          expect(res.body.data[0].id).toBe(2);
          expect(res.body.data[0].name).toBe('Label Test 2');
          expect(res.body.data[1].id).toBe(3);
          expect(res.body.data[1].name).toBe('Label Test 3');
          done();
        });
  });

  it('getAllTasks test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
        .get('/api/task')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data.length).toBe(3);
          expect(res.body.data[1].name).toBe('Task Test 2');
          expect(res.body.data[1].description).toBe('Beschreibung Test 2');
          done();
        });
  });
  it('getAllTasks Filter TaskName', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
        .get('/api/task?filterTask=Task Test 1')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data.length).toBe(1);
          expect(res.body.data[0].name).toBe('Task Test 1');
          expect(res.body.data[0].description).toBe('Beschreibung Test 1');
          done();
        });
  });
  it('getAllTasks Filter Label', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
        .get('/api/task?filterLabel=Label Test 1')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data.length).toBe(2);
          expect(res.body.data[1].name).toBe('Task Test 3');
          expect(res.body.data[1].description).toBe('Beschreibung Test 3');
          done();
        });
  });

  it('getAllTasks Filter Label Description', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
        // eslint-disable-next-line
        .get('/api/task?filterLabel=Label Test 2&filterDescription=Beschreibung Test 3')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data.length).toBe(1);
          expect(res.body.data[0].name).toBe('Task Test 3');
          expect(res.body.data[0].description).toBe('Beschreibung Test 3');
          done();
        });
  });
  it('getAllTasks Filter All', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
        // eslint-disable-next-line
        .get('/api/task?filterLabel=Label Test 1&filterDescription=Beschreibung Test 1&filterTask=Task Test 1')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data.length).toBe(1);
          expect(res.body.data[0].name).toBe('Task Test 1');
          expect(res.body.data[0].description).toBe('Beschreibung Test 1');
          done();
        });
  });

  it('getAllTrackingsByTaskId test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }


    request(helper.app)
        .get(`/api/task/tracking/${task.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          const [, task] =
            await helper.getRepo(Task).findAndCount();
          expect(task).toBe(3);
          expect(res.body.data[0].id).toBe(2);
          expect(res.body.data[0].description).toBe('Tracking Test 2');
          done();
        });
  });

  it('getTaskById test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }


    request(helper.app)
        .get(`/api/task/${task.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          const [, task] =
            await helper.getRepo(Task).findAndCount();
          expect(task).toBe(3);
          expect(res.body.data.name).toBe('Task Test 2');
          expect(res.body.data.description).toBe('Beschreibung Test 2');
          done();
        });
  });

  it('sendSlackAll test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }
    request(helper.app)
        .post(`/api/task/slack`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          const [, taskLength] =
            await helper.getRepo(Task).findAndCount();
          expect(taskLength).toBe(3);
          expect(res.body.data[1].name).toBe('Task Test 2');
          expect(res.body.data[1].id).toBe(task.id);
          done();
        });
  });

  it('sendSlackByTaskId test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 3});
    } catch (error) {
    }
    request(helper.app)
        .post(`/api/task/slack/${task.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          expect(res.body.data.name).toBe('Task Test 3');
          expect(res.body.data.id).toBe(3);
          done();
        });
  });

  it('updateTaskById test', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    try {
      task = await helper.getRepo(Task).findOneOrFail({id: 2});
    } catch (error) {
    }

    request(helper.app)
        .patch(`/api/task/${task.id}`)
        .send({
          name: 'Task Test 2 Update',
          description: 'Beschreibung Test 2 Update',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end(async (err, res) => {
          if (err) throw err;
          const [, task] =
            await helper.getRepo(Task).findAndCount();
          expect(task).toBe(3);
          expect(res.body.data.name).toBe('Task Test 2 Update');
          expect(res.body.data.description).toBe('Beschreibung Test 2 Update');
          done();
        });
  });
});
