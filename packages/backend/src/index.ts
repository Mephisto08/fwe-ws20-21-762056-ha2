
import express from 'express';
import {dbConnection} from './data/DB_Connection/createDBConnection';
import {globalRouter} from './data/Router/router.global';
import * as bodyParser from 'body-parser';

/**
 * In dieser Funktion wird die Datenbankverbindung
 * aufgebaut und der Server wird gestartet.
 */
export const server = async () => {
  try {
    const app = express();
    const port = 3000;
    await dbConnection();

    app.use(bodyParser.json());

    app.use('/api', globalRouter);
    app.get('/', (req, res) => {
      res.send('Hallo das ist dein Timetracker! Nutzen Sie "http://localhost:3000/api" um in die Anwendung zukommen.');
    });

    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

server();
